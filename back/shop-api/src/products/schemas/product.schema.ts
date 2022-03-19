import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category, Rating } from "../types/types";

export type ProductDocument = Product & Document
@Schema()
export class Product {
    @Prop({ required: true, unique: true })
    productName: string
    @Prop({ required: true})
    releaseYear: string
    @Prop({ type: {
        name: {
            type: mongoose.SchemaTypes.String
        },
        props: {
            type: mongoose.SchemaTypes.Array
        }
    }, 
    required: true})
    category: Category
    @Prop(  { default: 'Вставьте описание' })
    description: string
    @Prop()
    fileNames: string[]
    @Prop({ type: {
        '5': {
            type: mongoose.SchemaTypes.Number
        },
        '4': {
            type: mongoose.SchemaTypes.Number
        },
        '3': {
            type: mongoose.SchemaTypes.Number
        },
        '2': {
            type: mongoose.SchemaTypes.Number
        },
        '1': {
            type: mongoose.SchemaTypes.Number
        }
    }, default: {
        '5': 0,
        '4': 0,
        '3': 0,
        '2': 0,
        '1': 0
    }})
    rating: Rating
    @Prop({ default: 0})
    totalReviews: number
    @Prop()
    props: string[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)