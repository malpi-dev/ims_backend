import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './schemas/client.schema';
import { Area } from './schemas/area.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../common/interfaces/pagination.interface';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Area.name) private readonly areaModel: Model<Area>,
  ) {}

  async findAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
  }): Promise<PaginatedResult<Client>> {
    const page = Number(params.page) || 1;
    const limit = Math.min(Number(params.limit) || 20, 100);
    const search = params.search?.trim();

    const filter: Record<string, any> = {
      ...softDeleteCondition(params.includeDeleted),
    };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await this.clientModel.countDocuments(filter);
    const data = await this.clientModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateClientDto) {
    return this.clientModel.create(dto);
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id);
    if (!client) throw new NotFoundException('Cliente no encontrado');
    return client;
  }

  async update(id: string, dto: UpdateClientDto) {
    const client = await this.clientModel.findById(id);
    if (!client) throw new NotFoundException('Cliente no encontrado');
    Object.assign(client, dto);
    await client.save();
    return client;
  }

  async remove(id: string) {
    const client = await this.clientModel.findOne({ _id: id, ...softDeleteQuery(false) });
    if (!client) throw new NotFoundException('Cliente no encontrado');
    client.deletedAt = new Date();
    await client.save();
    return { data: true, message: 'Cliente eliminado' };
  }

  async listAreas(
    clientId: string,
    params: { search?: string; page?: number; limit?: number; includeDeleted?: boolean },
  ): Promise<PaginatedResult<Area>> {
    const page = Number(params.page) || 1;
    const limit = Math.min(Number(params.limit) || 20, 100);
    const search = params.search?.trim();
    const filter: Record<string, any> = {
      clientId,
      ...softDeleteCondition(params.includeDeleted),
    };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await this.areaModel.countDocuments(filter);
    const data = await this.areaModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createArea(clientId: string, dto: CreateAreaDto) {
    return this.areaModel.create({ ...dto, clientId });
  }

  async getArea(clientId: string, id: string) {
    const area = await this.areaModel.findOne({ _id: id, clientId });
    if (!area) throw new NotFoundException('Área no encontrada');
    return area;
  }

  async updateArea(clientId: string, id: string, dto: UpdateAreaDto) {
    const area = await this.areaModel.findOne({ _id: id, clientId });
    if (!area) throw new NotFoundException('Área no encontrada');
    Object.assign(area, dto);
    await area.save();
    return area;
  }

  async removeArea(clientId: string, id: string) {
    const area = await this.areaModel.findOne({ _id: id, clientId, ...softDeleteQuery(false) });
    if (!area) throw new NotFoundException('Área no encontrada');
    area.deletedAt = new Date();
    await area.save();
    return { data: true, message: 'Área eliminada' };
  }
}
