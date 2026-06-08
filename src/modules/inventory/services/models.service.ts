import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Model as InventoryModel } from '../schemas/model.schema';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';

@Injectable()
export class ModelsService {
  constructor(
    @InjectModel(InventoryModel.name)
    private readonly modelModel: Model<InventoryModel>,
  ) {}

  async findAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
    brandId?: string;
  }): Promise<PaginatedResult<InventoryModel>> {
    const page = Number(params.page) || 1;
    const limit = Math.min(Number(params.limit) || 20, 100);
    const search = params.search?.trim();

    const filter: Record<string, any> = {
      ...softDeleteCondition(params.includeDeleted),
    };
    if (params.brandId) filter.brandId = params.brandId;
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

  async create(dto: CreateModelDto) {
    return this.modelModel.create(dto);
  }

  async findOne(id: string) {
    const model = await this.modelModel.findById(id).populate('brandId');
    if (!model) throw new NotFoundException('Modelo no encontrado');
    return model;
  }

  async update(id: string, dto: UpdateModelDto) {
    const model = await this.modelModel.findById(id);
    if (!model) throw new NotFoundException('Modelo no encontrado');
    Object.assign(model, dto);
    await model.save();
    return model;
  }

  async remove(id: string) {
    const model = await this.modelModel.findOne({ _id: id, ...softDeleteQuery(false) });
    if (!model) throw new NotFoundException('Modelo no encontrado');
    model.deletedAt = new Date();
    await model.save();
    return { data: true, message: 'Modelo eliminado' };
  }
}
