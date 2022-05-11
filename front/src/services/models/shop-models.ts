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

export enum PropCompareTypes {
    NUMBER_UP = 'u',
    NUMBER_DOWN = 'd',
    PREFERENCE = 'p',
    BINARY = 'b'
}

export type CategoryProp = {
    name: string
    bool?: boolean
    filter?: boolean
    bestValue?: string[]
    compareType?: PropCompareTypes
    tiers?: [number, number][]
}

export type CategoryResponse = {
    name: string
    route: string
    props: CategoryProp[]
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

export type DeletedProductResponse = {
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

export type CreateReviewData = {
    readonly product: string
    readonly rating: string
    readonly reviewDate: Date
    readonly content: string
}

export type DeleteReviewData = {
    readonly product: string
}

export type ReviewResponse = {
    readonly _id: string
    readonly user: string
    readonly userName: string
    readonly product: string
    readonly rating: number
    readonly reviewDate: Date
    readonly content: string
}

export type ReviewIdResponse = {
    readonly _id: string
}

export type AllReviewIdsResponse = {
    readonly userReview?: ReviewIdResponse
    readonly reviews: ReviewIdResponse[]
}

export type DeletedReviewResponse = {
    readonly deletedCount: number
    readonly acknowledged: boolean
}

export const defaultCriterias = [
    'Цена', 'Производитель', 'Пользовательский рейтинг', 'Год выпуска'
]

export type Criteria =  {
    name: string
    importance: string
    index: number
    preferences?: boolean
    prefValues?: string[][]
}

export type CompareProductsData = {
    products: string[]
    crits: Criteria[]
    category: string
}