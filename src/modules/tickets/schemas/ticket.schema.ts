import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '../../../common/schemas/base.schema';

@Schema({ _id: false })
export class Resolution {
  @Prop({ required: true })
  failureCause!: string;

  @Prop({ default: false })
  negligence!: boolean;

  @Prop({ type: [String], default: [] })
  replacedParts!: string[];

  @Prop()
  evidenceImage!: string;

  @Prop({ default: Date.now })
  resolvedAt!: Date;
}

export const ResolutionSchema = SchemaFactory.createForClass(Resolution);

@Schema({ timestamps: true })
export class Ticket extends BaseSchema {
  @Prop({ type: String, unique: true })
  folio!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', default: null })
  reportedBy!: string | null;

  @Prop({ type: String, default: null })
  reporterName!: string | null;

  @Prop({ type: String, default: null })
  reporterContact!: string | null;

  @Prop({ type: String, required: true })
  problemType!: string;

  @Prop({ type: String, required: true })
  problemDescription!: string;

  @Prop({ type: [String], default: [] })
  images!: string[];

  @Prop({
    type: String,
    enum: ['abierto', 'en_proceso', 'cerrado', 'pendiente', 'cancelado'],
    default: 'abierto',
  })
  status!: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', default: null })
  assignedTo!: string | null;

  @Prop({ type: Date, default: null })
  assignedAt!: Date | null;

  @Prop({ type: Date, default: null })
  closedAt!: Date | null;

  @Prop({ type: ResolutionSchema, default: null })
  resolution!: Resolution | null;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
