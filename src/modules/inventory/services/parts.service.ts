import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Part } from '../schemas/part.schema';
import { CreatePartDto } from '../dto/create-part.dto';
import { UpdatePartDto } from '../dto/update-part.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';

@Injectable()
export class PartsService {
  constructor(@InjectModel(Part.name) private readonly partModel: Model<Part>) {}

  async findAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
    partType?: string;
  }): Promise<PaginatedResult<Part>> {
    const page = Number(params.page) || 1;
    const limit = Math.min(Number(params.limit) || 20, 100);
    const search = params.search?.trim();

    const filter: Record<string, any> = {
      ...softDeleteCondition(params.includeDeleted),
    };
    if (params.partType) filter.partType = params.partType;
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

  async create(dto: CreatePartDto) {
    return this.partModel.create(dto);
  }

  async findOne(id: string) {
    const part = await this.partModel.findById(id);
    if (!part) throw new NotFoundException('Parte no encontrada');
    return part;
  }

  async update(id: string, dto: UpdatePartDto) {
    const part = await this.partModel.findById(id);
    if (!part) throw new NotFoundException('Parte no encontrada');
    Object.assign(part, dto);
    await part.save();
    return part;
  }

  async remove(id: string) {
    const part = await this.partModel.findOne({ _id: id, ...softDeleteQuery(false) });
    if (!part) throw new NotFoundException('Parte no encontrada');
    part.deletedAt = new Date();
    await part.save();
    return { data: true, message: 'Parte eliminada' };
  }
}
