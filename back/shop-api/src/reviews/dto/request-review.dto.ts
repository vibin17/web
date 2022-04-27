import { IsNumberString, IsString } from "class-validator"

export class CreateReviewDto {
    @IsString()
    readonly product: string
    @IsNumberString()
    readonly rating: number
    readonly content: string
}

export class DeleteReviewDto {
    @IsString()
    readonly product: string
}

export class UserInfoDto {
    readonly userId: string
    readonly userName: string
}