import { Category, Rating } from "../types/types"

export class ResponseProductDto {
    readonly _id: string
    readonly productName: string
    readonly manufacturer: string
    readonly releaseYear: string
    readonly price: number
    readonly rating: Rating
    readonly category: string
    readonly imagePaths: string[]
    readonly props: string[]
}

export class ResponseProductIdDto {
    readonly _id: string
    readonly productName: string
}

export class ResponseProductSummaryDto {
    readonly _id: string
    readonly productName: string
    readonly price: number
    readonly imagePath: string
    readonly rating: Rating
}


export class DeletedProductDto {
    readonly deletedFiles: string[]
    readonly deletedCount: number
    readonly acknowledged: boolean
    
}

export class ResponseCompareDto {
    readonly results: number[]
    readonly bestAlt: number
    readonly rates: number[][]
}