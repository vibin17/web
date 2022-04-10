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

    @Prop({ _id: false, type: {
        id: {
            type: mongoose.SchemaTypes.String
        },
        address: {
            type: mongoose.SchemaTypes.String
        }
    }, 
        required: true
    })
    category: Shop

    @Prop({ default: 'Вставьте описание' })
    description: string

    @Prop()
    imagePaths: string[]

    @Prop()
    props: string[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)