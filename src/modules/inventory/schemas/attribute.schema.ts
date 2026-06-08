import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class Attribute extends BaseSchema {
  @Prop()
  name!: string;

  @Prop({ type: String, unique: true, uppercase: true })
  code!: string;

  @Prop({
    type: String,
    enum: ['string', 'number', 'boolean', 'date', 'enum', 'json', 'ip', 'mac'],
  })
  valueType!: string;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
