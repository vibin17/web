import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document
@Schema()
export class Review {
    @Prop({ required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    user: string
    @Prop({ required: true })
    userName: string
    @Prop({ required: true,
        type: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Product'
        }]
    })
    product: string
    @Prop({ required: true })
    rating: number
    @Prop({ required: true })
    reviewDate: Date
    @Prop()
    content: string
}

export const ReviewSchema = SchemaFactory.createForClass(Review)