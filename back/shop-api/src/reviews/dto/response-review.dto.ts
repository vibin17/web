export class ResponseReviewDto {
    readonly _id: string
    readonly user: string
    readonly userName: string
    readonly product: string
    readonly rating: number
    readonly content: string
}

export class ResponseReviewIdDto {
    readonly _id: string
}

export class DeletedReviewDto {
    readonly deletedCount: number
    readonly acknowledged: boolean
}