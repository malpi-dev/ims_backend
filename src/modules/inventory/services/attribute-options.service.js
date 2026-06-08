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
exports.AttributeOptionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attribute_option_schema_1 = require("../schemas/attribute-option.schema");
const soft_delete_helper_1 = require("../../../common/helpers/soft-delete.helper");
let AttributeOptionsService = class AttributeOptionsService {
    optionModel;
    constructor(optionModel) {
        this.optionModel = optionModel;
    }
    async list(attributeId, params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const filter = { attributeId, ...(0, soft_delete_helper_1.softDeleteCondition)(false) };
        const total = await this.optionModel.countDocuments(filter);
        const data = await this.optionModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async create(attributeId, dto) {
        return this.optionModel.create({ ...dto, attributeId });
    }
    async update(attributeId, id, dto) {
        const option = await this.optionModel.findOne({ _id: id, attributeId });
        if (!option)
            throw new common_1.NotFoundException('Opción no encontrada');
        Object.assign(option, dto);
        await option.save();
        return option;
    }
    async remove(attributeId, id) {
        const option = await this.optionModel.findOne({
            _id: id,
            attributeId,
            ...(0, soft_delete_helper_1.softDeleteQuery)(false),
        });
        if (!option)
            throw new common_1.NotFoundException('Opción no encontrada');
        option.deletedAt = new Date();
        await option.save();
        return { data: true, message: 'Opción eliminada' };
    }
};
exports.AttributeOptionsService = AttributeOptionsService;
exports.AttributeOptionsService = AttributeOptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attribute_option_schema_1.AttributeOption.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttributeOptionsService);
//# sourceMappingURL=attribute-options.service.js.map