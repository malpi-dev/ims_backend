import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { ProductAttributeValue } from '../schemas/product-attribute-value.schema';
import { ProductTypeAttribute } from '../schemas/product-type-attribute.schema';
import { Attribute } from '../schemas/attribute.schema';
import { AttributeOption } from '../schemas/attribute-option.schema';
import { ProductPart } from '../schemas/product-part.schema';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AssignPartDto } from '../dto/assign-part.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(ProductAttributeValue.name)
    private readonly attributeValueModel: Model<ProductAttributeValue>,
    @InjectModel(ProductTypeAttribute.name)
    private readonly productTypeAttributeModel: Model<ProductTypeAttribute>,
    @InjectModel(Attribute.name) private readonly attributeModel: Model<Attribute>,
    @InjectModel(AttributeOption.name)
    private readonly optionModel: Model<AttributeOption>,
    @InjectModel(ProductPart.name) private readonly productPartModel: Model<ProductPart>,
  ) {}

  async findAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
    status?: string;
    productTypeId?: string;
    modelId?: string;
  }): Promise<PaginatedResult<Product>> {
    const page = Number(params.page) || 1;
    const limit = Math.min(Number(params.limit) || 20, 100);
    const search = params.search?.trim();

    const filter: Record<string, any> = {
      ...softDeleteCondition(params.includeDeleted),
    };
    if (params.status) filter.status = params.status;
    if (params.productTypeId) filter.productTypeId = params.productTypeId;
    if (params.modelId) filter.modelId = params.modelId;
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

  async create(dto: CreateProductDto) {
    const product = await this.productModel.create({
      ...dto,
      purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : null,
    });
    return product;
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate({ path: 'modelId', populate: { path: 'brandId' } })
      .populate('productTypeId')
      .populate({ path: 'assignedTo', populate: { path: 'clientId' } });

    if (!product) throw new NotFoundException('Producto no encontrado');

    const attributes = await this.attributeValueModel
      .find({ productId: id, ...softDeleteCondition(false) })
      .populate('attributeId');
    const parts = await this.productPartModel
      .find({ productId: id, ...softDeleteCondition(false) })
      .populate('partId');

    return {
      ...product.toObject(),
      attributes,
      parts,
    };
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Producto no encontrado');
    Object.assign(product, {
      ...dto,
      purchaseDate: dto.purchaseDate ? new Date(dto.purchaseDate) : product.purchaseDate,
    });
    await product.save();
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findOne({
      _id: id,
      ...softDeleteQuery(false),
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    product.deletedAt = new Date();
    await product.save();
    return { data: true, message: 'Producto eliminado' };
  }

  async lookupByInventoryCode(inventoryCode: string) {
    const product = await this.productModel
      .findOne({ inventoryCode, ...softDeleteCondition(false) })
      .populate('productTypeId');
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async assignPart(productId: string, dto: AssignPartDto) {
    const product = await this.productModel.findOne({
      _id: productId,
      ...softDeleteCondition(false),
    });
    if (!product) throw new NotFoundException('Producto no encontrado');

    return this.productPartModel.create({
      productId,
      partId: dto.partId,
      folio: dto.folio || null,
      status: dto.status || 'assigned',
      notes: dto.notes || null,
    });
  }

  async updateAttributeValue(productId: string, dto: UpdateAttributeValueDto) {
    const product = await this.productModel.findOne({
      _id: productId,
      ...softDeleteCondition(false),
    });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const attribute = await this.attributeModel.findOne({
      _id: dto.attributeId,
      ...softDeleteCondition(false),
    });
    if (!attribute) throw new NotFoundException('Atributo no encontrado');

    const allowed = await this.productTypeAttributeModel.findOne({
      productTypeId: product.productTypeId,
      attributeId: dto.attributeId,
      ...softDeleteCondition(false),
    });
    if (!allowed) {
      throw new BadRequestException('Atributo no permitido para este tipo de producto');
    }

    if (attribute.valueType === 'enum') {
      const optionExists = await this.optionModel.findOne({
        attributeId: dto.attributeId,
        value: dto.valueEnum,
        ...softDeleteCondition(false),
      });
      if (!optionExists) {
        throw new BadRequestException('Opción de atributo inválida');
      }
    }

    const normalized = this.normalizeAttributeValue(attribute.valueType, dto);

    const value = await this.attributeValueModel.findOneAndUpdate(
      { productId, attributeId: dto.attributeId },
      { $set: { ...normalized, productId, attributeId: dto.attributeId } },
      { upsert: true, new: true },
    );

    return value;
  }

  private normalizeAttributeValue(valueType: string, dto: UpdateAttributeValueDto) {
    const base = {
      valueString: null,
      valueNumber: null,
      valueBoolean: null,
      valueDate: null,
      valueJson: null,
      valueEnum: null,
    } as Record<string, any>;

    switch (valueType) {
      case 'number':
        if (dto.valueNumber === undefined || dto.valueNumber === null) {
          throw new BadRequestException('valueNumber requerido');
        }
        base.valueNumber = dto.valueNumber;
        break;
      case 'enum':
        if (!dto.valueEnum) throw new BadRequestException('valueEnum requerido');
        base.valueEnum = dto.valueEnum;
        break;
      case 'boolean':
        if (dto.valueBoolean === undefined || dto.valueBoolean === null) {
          throw new BadRequestException('valueBoolean requerido');
        }
        base.valueBoolean = dto.valueBoolean;
        break;
      case 'date':
        if (!dto.valueDate) throw new BadRequestException('valueDate requerido');
        base.valueDate = new Date(dto.valueDate);
        break;
      case 'json':
        base.valueJson = dto.valueJson ?? null;
        break;
      case 'ip':
        if (!dto.valueString) throw new BadRequestException('valueString requerido');
        if (!/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(dto.valueString)) {
          throw new BadRequestException('Formato IP inválido');
        }
        base.valueString = dto.valueString;
        break;
      case 'mac':
        if (!dto.valueString) throw new BadRequestException('valueString requerido');
        if (!/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(dto.valueString)) {
          throw new BadRequestException('Formato MAC inválido');
        }
        base.valueString = dto.valueString;
        break;
      default:
        if (!dto.valueString) throw new BadRequestException('valueString requerido');
        base.valueString = dto.valueString;
        break;
    }

    return base;
  }
}
