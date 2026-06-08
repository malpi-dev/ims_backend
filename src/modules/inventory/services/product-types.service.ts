import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductType } from '../schemas/product-type.schema';
import { CreateProductTypeDto } from '../dto/create-product-type.dto';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectModel(ProductType.name) private readonly productTypeModel: Model<ProductType>,
  ) {}

  async findAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
  }): Promise<PaginatedResult<ProductType>> {
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

  async create(dto: CreateProductTypeDto) {
    return this.productTypeModel.create(dto);
  }

  async findOne(id: string) {
    const productType = await this.productTypeModel.findById(id);
    if (!productType) throw new NotFoundException('Tipo de producto no encontrado');
    return productType;
  }

  async update(id: string, dto: UpdateProductTypeDto) {
    const productType = await this.productTypeModel.findById(id);
    if (!productType) throw new NotFoundException('Tipo de producto no encontrado');
    Object.assign(productType, dto);
    await productType.save();
    return productType;
  }

  async remove(id: string) {
    const productType = await this.productTypeModel.findOne({
      _id: id,
      ...softDeleteQuery(false),
    });
    if (!productType) throw new NotFoundException('Tipo de producto no encontrado');
    productType.deletedAt = new Date();
    await productType.save();
    return { data: true, message: 'Tipo de producto eliminado' };
  }
}
