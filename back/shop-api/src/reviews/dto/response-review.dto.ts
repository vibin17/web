export class ResponseReviewDto {
    readonly _id: string
    readonly user: string
    readonly userName: string
    readonly product: string
    readonly rating: number
    readonly reviewDate: Date
    readonly content: string
}

export class ResponseReviewIdDto {
    readonly _id: string
}

export class ResponseAllReviewIdsDto {
    readonly userReview?: ResponseReviewIdDto
    readonly reviews: ResponseReviewIdDto[]
}

export class DeletedReviewDto {
    readonly deletedCount: number
    readonly acknowledged: boolean
}