import { Category } from "../types/types"

export class ResponseProductDto {
    productName: string
    releaseYear: string
    category: Category
    fileNames: string[]
}