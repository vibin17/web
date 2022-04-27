export type CreateProductData = {
    readonly productName: string
    readonly manufacturer: string
    readonly releaseYear: string
    readonly price: string
    readonly category: string
    readonly description: string
    readonly props: string[]
}

export type UpdateProductData = {
    readonly id: string
    readonly productName: string
    readonly manufacturer: string
    readonly releaseYear: string
    readonly price: string
    readonly category: string
    readonly description: string
    readonly props: string[]
}

export type CateogryProp = {
    name: string
}

export type CategoryResponseDto = {
    name: string
    route: string
    props: CateogryProp[]
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
    readonly rating: {
        '5': number
        '4': number
        '3': number
        '2': number
        '1': number
    }
}

export type ProductResponse = {
    readonly _id: string
    readonly productName: string
    readonly manufacturer: string
    readonly releaseYear: string
    readonly price: string
    readonly description: string
    readonly rating: {
        '5': number
        '4': number
        '3': number
        '2': number
        '1': number
    }
    readonly category: string
    readonly imagePaths: string[]
    readonly props: string[]
}

export type DeletedResponse = {
    readonly deletedFiles: string[]
    readonly acknowledged: boolean
    readonly deletedCount: number
}

export type ShopResponse = {
    address: string
}

export type CreateOrderData = {
    orderType: string
    orderDate: Date
    deliveryAddress: string
    paymentType: string
}

export type OrderResponse = {
    _id: string
    user: string
    products: string[]
    orderType: string
    orderDate: Date
    deliveryAddress: string
    paymentType: string
    price: number
}