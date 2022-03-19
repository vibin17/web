import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { RolesEnum } from "./roles.enum";

export type UserDocument = User & Document
@Schema()
export class User {
    @Prop({required: true, unique: true })
    userName: string
    @Prop({required: true, unique: true })
    phoneNumber: string
    @Prop({required: true})
    password: string
    @Prop({default: false })
    isActivated?: boolean
    @Prop({type: [{type: mongoose.Schema.Types.String}], default: RolesEnum.User})
    roles: RolesEnum[]
}

export const UserSchema = SchemaFactory.createForClass(User)