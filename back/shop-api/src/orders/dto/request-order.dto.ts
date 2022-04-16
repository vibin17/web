import { IsString, IsDate, IsDateString } from "class-validator"

export class CreateOrderDto {
    products: string[]
    @IsString()
    orderType: string
    @IsDateString()
    orderDate: Date
    @IsString()
    deliveryAddress: string
    @IsString()
    paymentType: string
}

export class UserIdDto {
    userId: string
}