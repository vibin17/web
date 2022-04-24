import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from 'mongoose';
import { OrderTypes, PaymentTypes } from "../types/types";

export type OrderDocument = Order & Document
@Schema()
export class Order {
    @Prop({ required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    user: string
    @Prop({ required: true,
        type: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Product'
        }]
    })
    products: string[]
    @Prop({ required: true, 
        type: mongoose.Schema.Types.String 
    })
    orderType: OrderTypes
    @Prop({ required: true })
    orderDate: Date
    @Prop({ required: true })
    deliveryAddress: string
    @Prop({ required: true, 
        type: mongoose.Schema.Types.String 
    })
    paymentType: PaymentTypes
}

export const OrderSchema = SchemaFactory.createForClass(Order)