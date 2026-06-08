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
exports.AttributesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attribute_schema_1 = require("../schemas/attribute.schema");
const soft_delete_helper_1 = require("../../../common/helpers/soft-delete.helper");
let AttributesService = class AttributesService {
    attributeModel;
    constructor(attributeModel) {
        this.attributeModel = attributeModel;
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
        const total = await this.attributeModel.countDocuments(filter);
        const data = await this.attributeModel
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
        return this.attributeModel.create(dto);
    }
    async findOne(id) {
        const attribute = await this.attributeModel.findById(id);
        if (!attribute)
            throw new common_1.NotFoundException('Atributo no encontrado');
        return attribute;
    }
    async update(id, dto) {
        const attribute = await this.attributeModel.findById(id);
        if (!attribute)
            throw new common_1.NotFoundException('Atributo no encontrado');
        Object.assign(attribute, dto);
        await attribute.save();
        return attribute;
    }
    async remove(id) {
        const attribute = await this.attributeModel.findOne({
            _id: id,
            ...(0, soft_delete_helper_1.softDeleteQuery)(false),
        });
        if (!attribute)
            throw new common_1.NotFoundException('Atributo no encontrado');
        attribute.deletedAt = new Date();
        await attribute.save();
        return { data: true, message: 'Atributo eliminado' };
    }
};
exports.AttributesService = AttributesService;
exports.AttributesService = AttributesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attribute_schema_1.Attribute.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttributesService);
//# sourceMappingURL=attributes.service.js.map