import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attribute } from '../schemas/attribute.schema';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../../common/helpers/soft-delete.helper';
import { PaginatedResult } from '../../../common/interfaces/pagination.interface';

@Injectable()
export class AttributesService {
  constructor(
    @InjectModel(Attribute.name) private readonly attributeModel: Model<Attribute>,
  ) {}

  async findAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    includeDeleted?: boolean;
  }): Promise<PaginatedResult<Attribute>> {
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

  async create(dto: CreateAttributeDto) {
    return this.attributeModel.create(dto);
  }

  async findOne(id: string) {
    const attribute = await this.attributeModel.findById(id);
    if (!attribute) throw new NotFoundException('Atributo no encontrado');
    return attribute;
  }

  async update(id: string, dto: UpdateAttributeDto) {
    const attribute = await this.attributeModel.findById(id);
    if (!attribute) throw new NotFoundException('Atributo no encontrado');
    Object.assign(attribute, dto);
    await attribute.save();
    return attribute;
  }

  async remove(id: string) {
    const attribute = await this.attributeModel.findOne({
      _id: id,
      ...softDeleteQuery(false),
    });
    if (!attribute) throw new NotFoundException('Atributo no encontrado');
    attribute.deletedAt = new Date();
    await attribute.save();
    return { data: true, message: 'Atributo eliminado' };
  }

  // Attribute options se manejan en AttributeOptionsService
}
