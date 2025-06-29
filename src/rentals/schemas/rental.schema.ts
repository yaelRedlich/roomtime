import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RentalDocument = Rental & Document;


@Schema({ timestamps: true })
export class Rental extends Document {
  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  businessId: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'declined' | 'cancelled';
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
