export class CreateProductDto {
    productName: string
    releaseYear: string
    categoryName: string
    description?: string
    images: any
    props?: string[]
}