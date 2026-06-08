import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class TicketProblemType extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'ProductType', required: true })
  productTypeId!: string;

  @Prop()
  name!: string;

  @Prop()
  description!: string;
}

export const TicketProblemTypeSchema = SchemaFactory.createForClass(TicketProblemType);
