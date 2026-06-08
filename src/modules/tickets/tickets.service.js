"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ticket_schema_1 = require("./schemas/ticket.schema");
const ticket_problem_type_schema_1 = require("./schemas/ticket-problem-type.schema");
const product_schema_1 = require("../inventory/schemas/product.schema");
const soft_delete_helper_1 = require("../../common/helpers/soft-delete.helper");
let TicketsService = class TicketsService {
    ticketModel;
    problemTypeModel;
    productModel;
    transitions = {
        abierto: ['en_proceso', 'cancelado'],
        en_proceso: ['cerrado', 'pendiente', 'cancelado'],
        pendiente: ['en_proceso', 'cerrado'],
        cerrado: [],
        cancelado: [],
    };
    constructor(ticketModel, problemTypeModel, productModel) {
        this.ticketModel = ticketModel;
        this.problemTypeModel = problemTypeModel;
        this.productModel = productModel;
    }
    async generateFolio() {
        const lastTicket = await this.ticketModel
            .findOne({}, { folio: 1 })
            .sort({ _id: -1 })
            .lean();
        const lastNumber = lastTicket
            ? parseInt(lastTicket.folio.replace('TKT-', ''), 10)
            : 0;
        return `TKT-${String(lastNumber + 1).padStart(4, '0')}`;
    }
    async createPublic(dto) {
        const product = await this.productModel.findOne({
            inventoryCode: dto.inventoryCode,
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
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
    async create(dto, userId) {
        const product = await this.productModel.findOne({
            _id: dto.productId,
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return this.ticketModel.create({
            folio: await this.generateFolio(),
            productId: dto.productId,
            reportedBy: userId,
            problemType: dto.problemType,
            problemDescription: dto.problemDescription,
            images: dto.images || [],
        });
    }
    async findAll(params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const filter = {
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        };
        if (params.query.status)
            filter.status = params.query.status;
        if (params.query.technician)
            filter.assignedTo = params.query.technician;
        if (params.query.dateFrom || params.query.dateTo) {
            filter.createdAt = {};
            if (params.query.dateFrom)
                filter.createdAt.$gte = new Date(params.query.dateFrom);
            if (params.query.dateTo)
                filter.createdAt.$lte = new Date(params.query.dateTo);
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
    async findOne(id) {
        const ticket = await this.ticketModel
            .findById(id)
            .populate('productId')
            .populate('assignedTo')
            .populate('reportedBy');
        if (!ticket)
            throw new common_1.NotFoundException('Ticket no encontrado');
        return ticket;
    }
    async take(id, userId) {
        const ticket = await this.ticketModel.findById(id);
        if (!ticket)
            throw new common_1.NotFoundException('Ticket no encontrado');
        if (ticket.status === 'cancelado')
            throw new common_1.BadRequestException('Ticket cancelado');
        if (ticket.assignedTo)
            throw new common_1.ConflictException('Ticket ya asignado');
        if (!this.isValidTransition(ticket.status, 'en_proceso')) {
            throw new common_1.BadRequestException('Transición inválida');
        }
        ticket.status = 'en_proceso';
        ticket.assignedTo = userId;
        ticket.assignedAt = new Date();
        await ticket.save();
        return ticket;
    }
    async close(id, userId, dto) {
        const ticket = await this.ticketModel.findById(id);
        if (!ticket)
            throw new common_1.NotFoundException('Ticket no encontrado');
        if (ticket.status === 'cancelado')
            throw new common_1.BadRequestException('Ticket cancelado');
        if (!ticket.assignedTo || ticket.assignedTo.toString() !== userId) {
            throw new common_1.ForbiddenException('No eres el técnico asignado');
        }
        if (!this.isValidTransition(ticket.status, 'cerrado')) {
            throw new common_1.BadRequestException('Transición inválida');
        }
        ticket.status = 'cerrado';
        ticket.closedAt = new Date();
        ticket.resolution = {
            failureCause: dto.failureCause,
            negligence: dto.negligence || false,
            replacedParts: dto.replacedParts || [],
            evidenceImage: dto.evidenceImage,
            resolvedAt: new Date(),
        };
        await ticket.save();
        return ticket;
    }
    async pending(id, userId) {
        const ticket = await this.ticketModel.findById(id);
        if (!ticket)
            throw new common_1.NotFoundException('Ticket no encontrado');
        if (ticket.status === 'cancelado')
            throw new common_1.BadRequestException('Ticket cancelado');
        if (!ticket.assignedTo || ticket.assignedTo.toString() !== userId) {
            throw new common_1.ForbiddenException('No eres el técnico asignado');
        }
        if (!this.isValidTransition(ticket.status, 'pendiente')) {
            throw new common_1.BadRequestException('Transición inválida');
        }
        ticket.status = 'pendiente';
        await ticket.save();
        return ticket;
    }
    async cancel(id) {
        const ticket = await this.ticketModel.findById(id);
        if (!ticket)
            throw new common_1.NotFoundException('Ticket no encontrado');
        if (ticket.status === 'cancelado')
            throw new common_1.BadRequestException('Ticket cancelado');
        if (!this.isValidTransition(ticket.status, 'cancelado')) {
            throw new common_1.BadRequestException('Transición inválida');
        }
        ticket.status = 'cancelado';
        await ticket.save();
        return ticket;
    }
    async report(params) {
        const filter = {
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        };
        if (params.status)
            filter.status = params.status;
        if (params.technician)
            filter.assignedTo = params.technician;
        if (params.dateFrom || params.dateTo) {
            filter.createdAt = {};
            if (params.dateFrom)
                filter.createdAt.$gte = new Date(params.dateFrom);
            if (params.dateTo)
                filter.createdAt.$lte = new Date(params.dateTo);
        }
        return this.ticketModel.find(filter).populate('productId').populate('assignedTo');
    }
    async listProblemTypes(productTypeId) {
        const filter = { ...(0, soft_delete_helper_1.softDeleteCondition)(false) };
        if (productTypeId)
            filter.productTypeId = productTypeId;
        return this.problemTypeModel.find(filter).populate('productTypeId');
    }
    async createProblemType(dto) {
        return this.problemTypeModel.create(dto);
    }
    async updateProblemType(id, dto) {
        const problem = await this.problemTypeModel.findById(id);
        if (!problem)
            throw new common_1.NotFoundException('Tipo de problema no encontrado');
        Object.assign(problem, dto);
        await problem.save();
        return problem;
    }
    async deleteProblemType(id) {
        const problem = await this.problemTypeModel.findById(id);
        if (!problem)
            throw new common_1.NotFoundException('Tipo de problema no encontrado');
        problem.deletedAt = new Date();
        await problem.save();
        return { data: true, message: 'Tipo de problema eliminado' };
    }
    isValidTransition(current, next) {
        return this.transitions[current]?.includes(next);
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ticket_schema_1.Ticket.name)),
    __param(1, (0, mongoose_1.InjectModel)(ticket_problem_type_schema_1.TicketProblemType.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map