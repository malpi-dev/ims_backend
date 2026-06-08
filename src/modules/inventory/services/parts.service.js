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
exports.PartsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const part_schema_1 = require("../schemas/part.schema");
const soft_delete_helper_1 = require("../../../common/helpers/soft-delete.helper");
let PartsService = class PartsService {
    partModel;
    constructor(partModel) {
        this.partModel = partModel;
    }
    async findAll(params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const search = params.search?.trim();
        const filter = {
            ...(0, soft_delete_helper_1.softDeleteCondition)(params.includeDeleted),
        };
        if (params.partType)
            filter.partType = params.partType;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
            ];
        }
        const total = await this.partModel.countDocuments(filter);
        const data = await this.partModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async create(dto) {
        return this.partModel.create(dto);
    }
    async findOne(id) {
        const part = await this.partModel.findById(id);
        if (!part)
            throw new common_1.NotFoundException('Parte no encontrada');
        return part;
    }
    async update(id, dto) {
        const part = await this.partModel.findById(id);
        if (!part)
            throw new common_1.NotFoundException('Parte no encontrada');
        Object.assign(part, dto);
        await part.save();
        return part;
    }
    async remove(id) {
        const part = await this.partModel.findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteQuery)(false) });
        if (!part)
            throw new common_1.NotFoundException('Parte no encontrada');
        part.deletedAt = new Date();
        await part.save();
        return { data: true, message: 'Parte eliminada' };
    }
};
exports.PartsService = PartsService;
exports.PartsService = PartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(part_schema_1.Part.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PartsService);
//# sourceMappingURL=parts.service.js.map