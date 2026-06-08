import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class BaseSchema {
  @Prop({ type: Date, default: null })
  deletedAt!: Date | null;
}
