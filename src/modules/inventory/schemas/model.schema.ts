import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class Model extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Brand', required: true })
  brandId!: string;

  @Prop()
  name!: string;

  @Prop()
  code!: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
ModelSchema.index({ brandId: 1, code: 1 }, { unique: true });
