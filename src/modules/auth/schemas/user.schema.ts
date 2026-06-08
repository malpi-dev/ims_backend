import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BaseSchema } from '../../../common/schemas/base.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ type: String, required: true, select: false })
  password!: string;

  @Prop({
    type: String,
    enum: ['super-user', 'admin', 'technician', 'user'],
    default: 'user',
  })
  role!: string;

  @Prop({ type: String, enum: ['active', 'banned'], default: 'active' })
  status!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});
