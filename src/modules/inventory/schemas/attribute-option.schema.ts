import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class AttributeOption extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Attribute', required: true })
  attributeId!: string;

  @Prop()
  label!: string;

  @Prop()
  value!: string;
}

export const AttributeOptionSchema = SchemaFactory.createForClass(AttributeOption);
AttributeOptionSchema.index({ attributeId: 1, value: 1 }, { unique: true });
