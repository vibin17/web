import { IsNumber, IsNumberString, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    readonly productName: string
    @IsString()
    readonly manufacturer: string
    @IsNumberString()
    readonly releaseYear: number
    @IsNumberString()
    readonly price: number
    @IsString()
    readonly category: string
    readonly description: string
    readonly props: string[]
}

export class UpdateProductDto {
    readonly id: string
    @IsString()
    readonly productName: string
    @IsString()
    readonly manufacturer: string
    @IsNumberString()
    readonly releaseYear: number
    @IsNumberString()
    readonly price: number
    @IsString()
    readonly category: string
    readonly description: string
    readonly props: string[]
}