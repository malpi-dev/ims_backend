import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class ProductType extends BaseSchema {
  @Prop()
  name!: string;

  @Prop({ type: String, unique: true, uppercase: true })
  code!: string;
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
