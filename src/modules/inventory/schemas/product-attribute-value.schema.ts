import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class ProductAttributeValue extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Attribute', required: true })
  attributeId!: string;

  @Prop({ type: String, default: null })
  valueString!: string | null;

  @Prop({ type: Number, default: null })
  valueNumber!: number | null;

  @Prop({ type: Boolean, default: null })
  valueBoolean!: boolean | null;

  @Prop({ type: Date, default: null })
  valueDate!: Date | null;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  valueJson!: unknown | null;

  @Prop({ type: String, default: null })
  valueEnum!: string | null;
}

export const ProductAttributeValueSchema = SchemaFactory.createForClass(ProductAttributeValue);
ProductAttributeValueSchema.index({ productId: 1, attributeId: 1 }, { unique: true });
