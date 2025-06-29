import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";


export type BusinessDocument = Business & Document;

@Schema()
export class Business {
@Prop({ required: true })
name: string;

@Prop()
description: string;

@Prop()
address: string;

@Prop()
phone: string;

@Prop()
email: string;

@Prop({ type: Types.ObjectId, ref: 'User', required: true })
owner: Types.ObjectId; 

@Prop({ default: false })
isApproved: boolean;

@Prop({ default: Date.now })
createdAt: Date;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);