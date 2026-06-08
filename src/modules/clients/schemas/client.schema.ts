import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class Client extends BaseSchema {
  @Prop()
  name!: string;

  @Prop({ type: String, unique: true, uppercase: true })
  code!: string;

  @Prop()
  contactEmail!: string;

  @Prop()
  contactPhone!: string;

  @Prop()
  address!: string;

  @Prop()
  notes!: string;

  @Prop({ type: String, enum: ['active', 'inactive'], default: 'active' })
  status!: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
