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
    readonly categoryName: string
    readonly description: string
    readonly props: string[]
}