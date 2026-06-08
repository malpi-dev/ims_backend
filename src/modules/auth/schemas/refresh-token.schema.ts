import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId!: string;

  @Prop({ type: String, required: true, unique: true })
  token!: string;

  @Prop({ type: Date, required: true })
  expiresAt!: Date;

  @Prop({ type: Boolean, default: false })
  isRevoked!: boolean;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

RefreshTokenSchema.index({ userId: 1 });
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
