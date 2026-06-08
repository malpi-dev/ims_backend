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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../schemas/product.schema");
const product_attribute_value_schema_1 = require("../schemas/product-attribute-value.schema");
const product_type_attribute_schema_1 = require("../schemas/product-type-attribute.schema");
const attribute_schema_1 = require("../schemas/attribute.schema");
const attribute_option_schema_1 = require("../schemas/attribute-option.schema");
const product_part_schema_1 = require("../schemas/product-part.schema");
const soft_delete_helper_1 = require("../../../common/helpers/soft-delete.helper");
let ProductsService = class ProductsService {
    productModel;
    attributeValueModel;
    productTypeAttributeModel;
    attributeModel;
    optionModel;
    productPartModel;
    constructor(productModel, attributeValueModel, productTypeAttributeModel, attributeModel, optionModel, productPartModel) {
        this.productModel = productModel;
        this.attributeValueModel = attributeValueModel;
        this.productTypeAttributeModel = productTypeAttributeModel;
        this.attributeModel = attributeModel;
        this.optionModel = optionModel;
        this.productPartModel = productPartModel;
    }
    async findAll(params) {
        const page = Number(params.page) || 1;
        const limit = Math.min(Number(params.limit) || 20, 100);
        const search = params.search?.trim();
        const filter = {
            ...(0, soft_delete_helper_1.softDeleteCondition)(params.includeDeleted),
        };
        if (params.status)
            filter.status = params.status;
        if (params.productTypeId)
            filter.productTypeId = params.productTypeId;
        if (params.modelId)
            filter.modelId = params.modelId;
        if (search) {
            filter.$or = [
                { inventoryCode: { $regex: search, $options: 'i' } },
                { serialNumber: { $regex: search, $options: 'i' } },
            ];
        }
        const total = await this.productModel.countDocuments(filter);
        const data = await this.productModel
            .find(filter)
            .populate({ path: 'modelId', populate: { path: 'brandId' } })
            .populate('productTypeId')
            .populate({ path: 'assignedTo', populate: { path: 'clientId' } })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async create(dto) {
        const product = await this.productModel.create({
            ...dto,
            purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : null,
        });
        return product;
    }
    async findOne(id) {
        const product = await this.productModel
            .findById(id)
            .populate({ path: 'modelId', populate: { path: 'brandId' } })
            .populate('productTypeId')
            .populate({ path: 'assignedTo', populate: { path: 'clientId' } });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        const attributes = await this.attributeValueModel
            .find({ productId: id, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .populate('attributeId');
        const parts = await this.productPartModel
            .find({ productId: id, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .populate('partId');
        return {
            ...product.toObject(),
            attributes,
            parts,
        };
    }
    async update(id, dto) {
        const product = await this.productModel.findById(id);
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        Object.assign(product, {
            ...dto,
            purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : product.purchaseDate,
        });
        await product.save();
        return product;
    }
    async remove(id) {
        const product = await this.productModel.findOne({
            _id: id,
            ...(0, soft_delete_helper_1.softDeleteQuery)(false),
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        product.deletedAt = new Date();
        await product.save();
        return { data: true, message: 'Producto eliminado' };
    }
    async lookupByInventoryCode(inventoryCode) {
        const product = await this.productModel
            .findOne({ inventoryCode, ...(0, soft_delete_helper_1.softDeleteCondition)(false) })
            .populate('productTypeId');
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return product;
    }
    async assignPart(productId, dto) {
        const product = await this.productModel.findOne({
            _id: productId,
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return this.productPartModel.create({
            productId,
            partId: dto.partId,
            folio: dto.folio || null,
            status: dto.status || 'assigned',
            notes: dto.notes || null,
        });
    }
    async updateAttributeValue(productId, dto) {
        const product = await this.productModel.findOne({
            _id: productId,
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        const attribute = await this.attributeModel.findOne({
            _id: dto.attributeId,
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        });
        if (!attribute)
            throw new common_1.NotFoundException('Atributo no encontrado');
        const allowed = await this.productTypeAttributeModel.findOne({
            productTypeId: product.productTypeId,
            attributeId: dto.attributeId,
            ...(0, soft_delete_helper_1.softDeleteCondition)(false),
        });
        if (!allowed) {
            throw new common_1.BadRequestException('Atributo no permitido para este tipo de producto');
        }
        if (attribute.valueType === 'enum') {
            const optionExists = await this.optionModel.findOne({
                attributeId: dto.attributeId,
                value: dto.valueEnum,
                ...(0, soft_delete_helper_1.softDeleteCondition)(false),
            });
            if (!optionExists) {
                throw new common_1.BadRequestException('Opción de atributo inválida');
            }
        }
        const normalized = this.normalizeAttributeValue(attribute.valueType, dto);
        const value = await this.attributeValueModel.findOneAndUpdate({ productId, attributeId: dto.attributeId }, { $set: { ...normalized, productId, attributeId: dto.attributeId } }, { upsert: true, new: true });
        return value;
    }
    normalizeAttributeValue(valueType, dto) {
        const base = {
            valueString: null,
            valueNumber: null,
            valueBoolean: null,
            valueDate: null,
            valueJson: null,
            valueEnum: null,
        };
        switch (valueType) {
            case 'number':
                if (dto.valueNumber === undefined || dto.valueNumber === null) {
                    throw new common_1.BadRequestException('valueNumber requerido');
                }
                base.valueNumber = dto.valueNumber;
                break;
            case 'enum':
                if (!dto.valueEnum)
                    throw new common_1.BadRequestException('valueEnum requerido');
                base.valueEnum = dto.valueEnum;
                break;
            case 'boolean':
                if (dto.valueBoolean === undefined || dto.valueBoolean === null) {
                    throw new common_1.BadRequestException('valueBoolean requerido');
                }
                base.valueBoolean = dto.valueBoolean;
                break;
            case 'date':
                if (!dto.valueDate)
                    throw new common_1.BadRequestException('valueDate requerido');
                base.valueDate = new Date(dto.valueDate);
                break;
            case 'json':
                base.valueJson = dto.valueJson ?? null;
                break;
            case 'ip':
                if (!dto.valueString)
                    throw new common_1.BadRequestException('valueString requerido');
                if (!/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(dto.valueString)) {
                    throw new common_1.BadRequestException('Formato IP inválido');
                }
                base.valueString = dto.valueString;
                break;
            case 'mac':
                if (!dto.valueString)
                    throw new common_1.BadRequestException('valueString requerido');
                if (!/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(dto.valueString)) {
                    throw new common_1.BadRequestException('Formato MAC inválido');
                }
                base.valueString = dto.valueString;
                break;
            default:
                if (!dto.valueString)
                    throw new common_1.BadRequestException('valueString requerido');
                base.valueString = dto.valueString;
                break;
        }
        return base;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_attribute_value_schema_1.ProductAttributeValue.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_type_attribute_schema_1.ProductTypeAttribute.name)),
    __param(3, (0, mongoose_1.InjectModel)(attribute_schema_1.Attribute.name)),
    __param(4, (0, mongoose_1.InjectModel)(attribute_option_schema_1.AttributeOption.name)),
    __param(5, (0, mongoose_1.InjectModel)(product_part_schema_1.ProductPart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map