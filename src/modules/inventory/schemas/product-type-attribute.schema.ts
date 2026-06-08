import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class ProductTypeAttribute extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductType', required: true })
  productTypeId!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Attribute', required: true })
  attributeId!: string;

  @Prop({ type: Boolean, default: false })
  required!: boolean;
}

export const ProductTypeAttributeSchema = SchemaFactory.createForClass(ProductTypeAttribute);
ProductTypeAttributeSchema.index({ productTypeId: 1, attributeId: 1 }, { unique: true });
