import { Category } from "../types/types"

export class ResponseProductDto {
    readonly _id?: string
    readonly productName: string
    readonly releaseYear: string
    readonly price: number
    readonly category: Category
    readonly imagePaths: string[]
    readonly props?: string[]
}

export class ResponseProductSummaryDto {
    readonly _id?: string
    readonly productName: string
    readonly price: number
    readonly image: any
}