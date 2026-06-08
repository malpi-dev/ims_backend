import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class Product extends BaseSchema {
  @Prop({ type: String, unique: true })
  inventoryCode!: string;

  @Prop({ type: String, unique: true, sparse: true, default: null })
  serialNumber!: string | null;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductType', required: true })
  productTypeId!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Model', required: true })
  modelId!: string;

  @Prop({ type: Date, default: null })
  purchaseDate!: Date | null;

  @Prop({
    type: String,
    enum: ['active', 'in_repair', 'retired', 'lost', 'disposed'],
    default: 'active',
  })
  status!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Area', default: null })
  assignedTo!: string | null;

  @Prop()
  notes!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
