import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id?: Types.ObjectId; 
  
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user', enum: ['user', 'business', 'admin'] })
  role: 'business' | 'admin' | 'user';

  @Prop()
  phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

