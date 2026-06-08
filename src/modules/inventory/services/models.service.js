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
exports.ModelsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_schema_1 = require("../schemas/model.schema");
const soft_delete_helper_1 = require("../../../common/helpers/soft-delete.helper");
let ModelsService = class ModelsService {
    modelModel;
    constructor(modelModel) {
        this.modelModel = modelModel;
    }
    async findAll(params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const search = params.search?.trim();
        const filter = {
            ...(0, soft_delete_helper_1.softDeleteCondition)(params.includeDeleted),
        };
        if (params.brandId)
            filter.brandId = params.brandId;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
            ];
        }
        const total = await this.modelModel.countDocuments(filter);
        const data = await this.modelModel
            .find(filter)
            .populate('brandId')
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
        return this.modelModel.create(dto);
    }
    async findOne(id) {
        const model = await this.modelModel.findById(id).populate('brandId');
        if (!model)
            throw new common_1.NotFoundException('Modelo no encontrado');
        return model;
    }
    async update(id, dto) {
        const model = await this.modelModel.findById(id);
        if (!model)
            throw new common_1.NotFoundException('Modelo no encontrado');
        Object.assign(model, dto);
        await model.save();
        return model;
    }
    async remove(id) {
        const model = await this.modelModel.findOne({ _id: id, ...(0, soft_delete_helper_1.softDeleteQuery)(false) });
        if (!model)
            throw new common_1.NotFoundException('Modelo no encontrado');
        model.deletedAt = new Date();
        await model.save();
        return { data: true, message: 'Modelo eliminado' };
    }
};
exports.ModelsService = ModelsService;
exports.ModelsService = ModelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_schema_1.Model.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ModelsService);
//# sourceMappingURL=models.service.js.map