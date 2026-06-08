import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttributeOption } from '../schemas/attribute-option.schema';
import { CreateAttributeOptionDto } from '../dto/create-attribute-option.dto';
import {
  softDeleteCondition,
  softDeleteQuery,
} from '../../../common/helpers/soft-delete.helper';

@Injectable()
export class AttributeOptionsService {
  constructor(
    @InjectModel(AttributeOption.name)
    private readonly optionModel: Model<AttributeOption>,
  ) {}

  async list(attributeId: string, params: { page?: number; limit?: number }) {
    const page = Number(params.page) || 1;
    const limit = Math.min(Number(params.limit) || 20, 100);
    const filter = { attributeId, ...softDeleteCondition(false) };

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

  async create(attributeId: string, dto: CreateAttributeOptionDto) {
    return this.optionModel.create({ ...dto, attributeId });
  }

  async update(attributeId: string, id: string, dto: CreateAttributeOptionDto) {
    const option = await this.optionModel.findOne({ _id: id, attributeId });
    if (!option) throw new NotFoundException('Opción no encontrada');
    Object.assign(option, dto);
    await option.save();
    return option;
  }

  async remove(attributeId: string, id: string) {
    const option = await this.optionModel.findOne({
      _id: id,
      attributeId,
      ...softDeleteQuery(false),
    });
    if (!option) throw new NotFoundException('Opción no encontrada');
    option.deletedAt = new Date();
    await option.save();
    return { data: true, message: 'Opción eliminada' };
  }
}
