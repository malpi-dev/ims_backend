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
exports.ProductTypesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_type_schema_1 = require("../schemas/product-type.schema");
const soft_delete_helper_1 = require("../../../common/helpers/soft-delete.helper");
let ProductTypesService = class ProductTypesService {
    productTypeModel;
    constructor(productTypeModel) {
        this.productTypeModel = productTypeModel;
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
        const total = await this.productTypeModel.countDocuments(filter);
        const data = await this.productTypeModel
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
        return this.productTypeModel.create(dto);
    }
    async findOne(id) {
        const productType = await this.productTypeModel.findById(id);
        if (!productType)
            throw new common_1.NotFoundException('Tipo de producto no encontrado');
        return productType;
    }
    async update(id, dto) {
        const productType = await this.productTypeModel.findById(id);
        if (!productType)
            throw new common_1.NotFoundException('Tipo de producto no encontrado');
        Object.assign(productType, dto);
        await productType.save();
        return productType;
    }
    async remove(id) {
        const productType = await this.productTypeModel.findOne({
            _id: id,
            ...(0, soft_delete_helper_1.softDeleteQuery)(false),
        });
        if (!productType)
            throw new common_1.NotFoundException('Tipo de producto no encontrado');
        productType.deletedAt = new Date();
        await productType.save();
        return { data: true, message: 'Tipo de producto eliminado' };
    }
};
exports.ProductTypesService = ProductTypesService;
exports.ProductTypesService = ProductTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_type_schema_1.ProductType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductTypesService);
//# sourceMappingURL=product-types.service.js.map