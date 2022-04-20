import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from 'mongoose';
import { Category, Rating } from "../types/types";

export type ProductDocument = Product & Document
@Schema()
export class Product {
    @Prop({ required: true, unique: true })
    productName: string
    @Prop({ required: true})
    manufacturer: string
    @Prop({ required: true})
    releaseYear: string

    @Prop({ required: true })
    price: number

    @Prop({ required: true })
    category: string

    @Prop({ default: 'Вставьте описание' })
    description: string

    @Prop()
    imagePaths: string[]

    @Prop({ 
        _id: false, 
        type: {
            '5': {
                type: mongoose.Schema.Types.Number,
                required: true
            },
            '4': {
                type: mongoose.Schema.Types.Number,
                required: true
            },
            '3': {
                type: mongoose.Schema.Types.Number,
                required: true
            },
            '2': {
                type: mongoose.Schema.Types.Number,
                required: true
            },
            '1': {
                type: mongoose.Schema.Types.Number,
                required: true
            }
        }, 
        default: {
            '5': 0,
            '4': 0,
            '3': 0,
            '2': 0,
            '1': 0
        }
    })
    rating: Rating

    @Prop()
    props: string[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)