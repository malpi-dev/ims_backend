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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_schema_1 = require("./schemas/client.schema");
const area_schema_1 = require("./schemas/area.schema");
const soft_delete_helper_1 = require("../../common/helpers/soft-delete.helper");
let ClientsService = class ClientsService {
    clientModel;
    areaModel;
    constructor(clientModel, areaModel) {
        this.clientModel = clientModel;
        this.areaModel = areaModel;
    }
    async findAll(params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const search = params.search?.trim();
        const filter = {
            ...(0, soft_delete_helper_1.softDeleteCondition)(params.includeDeleted),
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
    async create(dto) {
        return this.clientModel.create(dto);
    }
    async findOne(id) {
        const client = await this.clientModel.findById(id);
        if (!client)
            throw new common_1.NotFoundException('Cliente no encontrado');
        return client;
    }
    async update(id, dto) {
        const client = await this.clientModel.findById(id);
        if (!client)
            throw new common_1.NotFoundException('Cliente no encontrado');
        Object.assign(client, dto);
        await client.save();
        return client;
    }
    async remove(id) {
        const client = await this.clientModel.findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteQuery)(false) });
        if (!client)
            throw new common_1.NotFoundException('Cliente no encontrado');
        client.deletedAt = new Date();
        await client.save();
        return { data: true, message: 'Cliente eliminado' };
    }
    async listAreas(clientId, params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const search = params.search?.trim();
        const filter = {
            clientId,
            ...(0, soft_delete_helper_1.softDeleteCondition)(params.includeDeleted),
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
    async createArea(clientId, dto) {
        return this.areaModel.create({ ...dto, clientId });
    }
    async getArea(clientId, id) {
        const area = await this.areaModel.findOne({ _id: id, clientId });
        if (!area)
            throw new common_1.NotFoundException('Área no encontrada');
        return area;
    }
    async updateArea(clientId, id, dto) {
        const area = await this.areaModel.findOne({ _id: id, clientId });
        if (!area)
            throw new common_1.NotFoundException('Área no encontrada');
        Object.assign(area, dto);
        await area.save();
        return area;
    }
    async removeArea(clientId, id) {
        const area = await this.areaModel.findOne({ _id: id, clientId, ...(0, soft_delete_helper_1.softDeleteQuery)(false) });
        if (!area)
            throw new common_1.NotFoundException('Área no encontrada');
        area.deletedAt = new Date();
        await area.save();
        return { data: true, message: 'Área eliminada' };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __param(1, (0, mongoose_1.InjectModel)(area_schema_1.Area.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ClientsService);
//# sourceMappingURL=clients.service.js.map