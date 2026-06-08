import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class ProductPart extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Part', required: true })
  partId!: string;

  @Prop({ type: String, default: null })
  folio!: string | null;

  @Prop({
    type: String,
    enum: ['assigned', 'in_stock', 'consumed', 'lost', 'damaged', 'retired'],
    default: 'assigned',
  })
  status!: string;

  @Prop({ type: Date, default: Date.now })
  assignedAt!: Date;

  @Prop()
  notes!: string;
}

export const ProductPartSchema = SchemaFactory.createForClass(ProductPart);
