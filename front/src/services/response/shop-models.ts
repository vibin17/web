export type CategoryResponseDto = {
    name: string,
    props: string[]
}

export type CreateProductData = {
    readonly productName: string
    readonly releaseYear: number
    readonly price: number
    readonly categoryName: string
    readonly description?: string
    readonly props?: string[]
}

export type ProductSummaryResponse = {
    readonly _id: string
    readonly productName: string
    readonly price: number
    readonly imagePath: string
}

export type ProductResponse = {
    readonly _id: string
    readonly productName: string
    readonly releaseYear: string
    readonly price: number
    readonly rating: {
        '5': number
        '4': number
        '3': number
        '2': number
        '1': number
    }
    readonly category: {
        name: string,
        props: string[]
    }
    readonly imagePaths: string[]
    readonly props: string[]
}