import { IsNumber, IsNumberString, IsString } from "class-validator"

export class CreateOrderDto {
    readonly productIds: string[]
    @IsString()
    readonly userId: string
    @IsString()
    readonly shop: string
}
