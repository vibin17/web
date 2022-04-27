import { IsString, IsDate, IsDateString } from "class-validator"

export class CreateOrderDto {
    readonly products: string[]
    @IsString()
    readonly orderType: string
    @IsDateString()
    readonly orderDate: Date
    @IsString()
    readonly deliveryAddress: string
    @IsString()
    readonly paymentType: string
}

export class UserIdDto {
    readonly userId: string
    readonly userName: string
}