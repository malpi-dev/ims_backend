import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class Part extends BaseSchema {
  @Prop()
  name!: string;

  @Prop({ type: String, unique: true })
  code!: string;

  @Prop({ type: String, enum: ['accessory', 'spare_part', 'consumable'] })
  partType!: string;
}

export const PartSchema = SchemaFactory.createForClass(Part);
