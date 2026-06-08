import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ timestamps: true })
export class Person extends BaseSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, unique: true })
  userId!: string;

  @Prop()
  name!: string;

  @Prop()
  surnames!: string;

  @Prop()
  birthday!: Date;

  @Prop()
  gender!: string;

  @Prop()
  profileImage!: string;

  @Prop()
  phone!: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
