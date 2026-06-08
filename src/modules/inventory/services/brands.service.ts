import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from '../schemas/brand.schema';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>) {}

  async findAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
  }): Promise<PaginatedResult<Brand>> {
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

    const total = await this.brandModel.countDocuments(filter);
    const data = await this.brandModel
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

  async create(dto: CreateBrandDto) {
    return this.brandModel.create(dto);
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id);
    if (!brand) throw new NotFoundException('Marca no encontrada');
    return brand;
  }

  async update(id: string, dto: UpdateBrandDto) {
    const brand = await this.brandModel.findById(id);
    if (!brand) throw new NotFoundException('Marca no encontrada');
    Object.assign(brand, dto);
    await brand.save();
    return brand;
  }

  async remove(id: string) {
    const brand = await this.brandModel.findOne({ _id: id, ...softDeleteQuery(false) });
    if (!brand) throw new NotFoundException('Marca no encontrada');
    brand.deletedAt = new Date();
    await brand.save();
    return { data: true, message: 'Marca eliminada' };
  }
}
