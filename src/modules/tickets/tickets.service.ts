import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './schemas/ticket.schema';
import { TicketProblemType } from './schemas/ticket-problem-type.schema';
import { CreatePublicTicketDto } from './dto/create-public-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CloseTicketDto } from './dto/close-ticket.dto';
import { TicketQueryDto } from './dto/ticket-query.dto';
import { CreateTicketProblemTypeDto, UpdateTicketProblemTypeDto } from './dto/problem-type.dto';
import { Product } from '../inventory/schemas/product.schema';
import { softDeleteCondition } from '../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../common/interfaces/pagination.interface';

@Injectable()
export class TicketsService {
  private readonly transitions: Record<string, string[]> = {
    abierto: ['en_proceso', 'cancelado'],
    en_proceso: ['cerrado', 'pendiente', 'cancelado'],
    pendiente: ['en_proceso', 'cerrado'],
    cerrado: [],
    cancelado: [],
  };

  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    @InjectModel(TicketProblemType.name)
    private readonly problemTypeModel: Model<TicketProblemType>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async generateFolio(): Promise<string> {
    const lastTicket = await this.ticketModel
      .findOne({}, { folio: 1 })
      .sort({ _id: -1 })
      .lean();
    const lastNumber = lastTicket
      ? parseInt(lastTicket.folio.replace('TKT-', ''), 10)
      : 0;
    return `TKT-${String(lastNumber + 1).padStart(4, '0')}`;
  }

  async createPublic(dto: CreatePublicTicketDto) {
    const product = await this.productModel.findOne({
      inventoryCode: dto.inventoryCode,
      ...softDeleteCondition(false),
    });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const ticket = await this.ticketModel.create({
      folio: await this.generateFolio(),
      productId: product._id,
      reporterName: dto.reporterName,
      reporterContact: dto.reporterContact,
      problemType: dto.problemType,
      problemDescription: dto.problemDescription,
      images: dto.images || [],
    });

    return ticket;
  }

  async create(dto: CreateTicketDto, userId: string) {
    const product = await this.productModel.findOne({
      _id: dto.productId,
      ...softDeleteCondition(false),
    });
    if (!product) throw new NotFoundException('Producto no encontrado');

    return this.ticketModel.create({
      folio: await this.generateFolio(),
      productId: dto.productId,
      reportedBy: userId,
      problemType: dto.problemType,
      problemDescription: dto.problemDescription,
      images: dto.images || [],
    });
  }

  async findAll(params: {
    query: TicketQueryDto;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResult<Ticket>> {
    const page = Number(params.page) || 1;
    const limit = Math.min(Number(params.limit) || 20, 100);
    const filter: Record<string, any> = {
      ...softDeleteCondition(params.query.includeDeleted),
    };

    if (params.query.status) filter.status = params.query.status;
    if (params.query.technician) filter.assignedTo = params.query.technician;
    if (params.query.dateFrom || params.query.dateTo) {
      filter.createdAt = {};
      if (params.query.dateFrom) filter.createdAt.$gte = new Date(params.query.dateFrom);
      if (params.query.dateTo) filter.createdAt.$lte = new Date(params.query.dateTo);
    }
    if (params.query.search) {
      filter.$or = [
        { folio: { $regex: params.query.search, $options: 'i' } },
        { inventoryCode: { $regex: params.query.search, $options: 'i' } },
      ];
    }

    const total = await this.ticketModel.countDocuments(filter);
    const data = await this.ticketModel
      .find(filter)
      .populate('productId')
      .populate('assignedTo')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel
      .findById(id)
      .populate('productId')
      .populate('assignedTo')
      .populate('reportedBy');
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    return ticket;
  }

  async take(id: string, userId: string) {
    const ticket = await this.ticketModel.findById(id);
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    if (ticket.status === 'cancelado') throw new BadRequestException('Ticket cancelado');
    if (ticket.assignedTo) throw new ConflictException('Ticket ya asignado');
    if (!this.isValidTransition(ticket.status, 'en_proceso')) {
      throw new BadRequestException('Transición inválida');
    }
    ticket.status = 'en_proceso';
    ticket.assignedTo = userId;
    ticket.assignedAt = new Date();
    await ticket.save();
    return ticket;
  }

  async close(id: string, userId: string, dto: CloseTicketDto) {
    const ticket = await this.ticketModel.findById(id);
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    if (ticket.status === 'cancelado') throw new BadRequestException('Ticket cancelado');
    if (!ticket.assignedTo || ticket.assignedTo.toString() !== userId) {
      throw new ForbiddenException('No eres el técnico asignado');
    }
    if (!this.isValidTransition(ticket.status, 'cerrado')) {
      throw new BadRequestException('Transición inválida');
    }

    ticket.status = 'cerrado';
    ticket.closedAt = new Date();
    ticket.resolution = {
      failureCause: dto.failureCause,
      negligence: dto.negligence || false,
      replacedParts: dto.replacedParts || [],
      evidenceImage: dto.evidenceImage,
      resolvedAt: new Date(),
    } as any;
    await ticket.save();
    return ticket;
  }

  async pending(id: string, userId: string) {
    const ticket = await this.ticketModel.findById(id);
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    if (ticket.status === 'cancelado') throw new BadRequestException('Ticket cancelado');
    if (!ticket.assignedTo || ticket.assignedTo.toString() !== userId) {
      throw new ForbiddenException('No eres el técnico asignado');
    }
    if (!this.isValidTransition(ticket.status, 'pendiente')) {
      throw new BadRequestException('Transición inválida');
    }
    ticket.status = 'pendiente';
    await ticket.save();
    return ticket;
  }

  async cancel(id: string) {
    const ticket = await this.ticketModel.findById(id);
    if (!ticket) throw new NotFoundException('Ticket no encontrado');
    if (ticket.status === 'cancelado') throw new BadRequestException('Ticket cancelado');
    if (!this.isValidTransition(ticket.status, 'cancelado')) {
      throw new BadRequestException('Transición inválida');
    }
    ticket.status = 'cancelado';
    await ticket.save();
    return ticket;
  }

  async report(params: TicketQueryDto) {
    const filter: Record<string, any> = {
      ...softDeleteCondition(false),
    };
    if (params.status) filter.status = params.status;
    if (params.technician) filter.assignedTo = params.technician;
    if (params.dateFrom || params.dateTo) {
      filter.createdAt = {};
      if (params.dateFrom) filter.createdAt.$gte = new Date(params.dateFrom);
      if (params.dateTo) filter.createdAt.$lte = new Date(params.dateTo);
    }
    return this.ticketModel.find(filter).populate('productId').populate('assignedTo');
  }

  async listProblemTypes(productTypeId?: string) {
    const filter: Record<string, any> = { ...softDeleteCondition(false) };
    if (productTypeId) filter.productTypeId = productTypeId;
    return this.problemTypeModel.find(filter).populate('productTypeId');
  }

  async createProblemType(dto: CreateTicketProblemTypeDto) {
    return this.problemTypeModel.create(dto);
  }

  async updateProblemType(id: string, dto: UpdateTicketProblemTypeDto) {
    const problem = await this.problemTypeModel.findById(id);
    if (!problem) throw new NotFoundException('Tipo de problema no encontrado');
    Object.assign(problem, dto);
    await problem.save();
    return problem;
  }

  async deleteProblemType(id: string) {
    const problem = await this.problemTypeModel.findById(id);
    if (!problem) throw new NotFoundException('Tipo de problema no encontrado');
    problem.deletedAt = new Date();
    await problem.save();
    return { data: true, message: 'Tipo de problema eliminado' };
  }

  private isValidTransition(current: string, next: string) {
    return this.transitions[current]?.includes(next);
  }
}
