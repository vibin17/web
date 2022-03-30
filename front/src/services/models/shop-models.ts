export type CreateProductData = {
    readonly productName: string
    readonly manufacturer: string
    readonly releaseYear: string
    readonly price: string
    readonly categoryName: string
    readonly description: string
    readonly props: string[]
}

export type CategoryResponseDto = {
    name: string,
    props: string[]
}

export type ProductIdResponse = {
    readonly _id: string
    readonly productName: string
}

export type ProductSummaryResponse = {
    readonly _id: string
    readonly productName: string
    readonly price: string
    readonly imagePath: string
}

export type ProductResponse = {
    readonly _id: string
    readonly productName: string
    readonly manufacturer: string
    readonly releaseYear: string
    readonly price: string
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

export type DeletedResponse = {
    readonly deletedFiles: string[]
    readonly acknowledged: boolean
    readonly deletedCount: number
}