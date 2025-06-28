import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
@Prop({ required: true })
name: string;

@Prop({ required: true })
description: string;

@Prop({ required: true })
location: string;

@Prop({ required: true })
pricePerHour: number;

@Prop({ required: true })
capacity: number;

@Prop({ type: [String], default: [] })
images: string[];

@Prop({ type: Types.ObjectId, ref: 'User', required: true })
owner: Types.ObjectId;

@Prop({ default: true })
isAvailable: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);