import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class Area extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Client', required: true })
  clientId!: string;

  @Prop()
  name!: string;

  @Prop()
  code!: string;

  @Prop()
  notes!: string;
}

export const AreaSchema = SchemaFactory.createForClass(Area);
AreaSchema.index({ clientId: 1, code: 1 }, { unique: true });
