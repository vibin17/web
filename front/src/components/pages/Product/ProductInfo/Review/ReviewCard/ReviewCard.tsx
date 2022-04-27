import { useEffect, useState } from "react"
import { ReviewResponse } from "../../../../../../services/models/shop-models"
import ShopService from "../../../../../../services/ShopService/shop-service"

type props = {
    reviewId: string
}

const ReviewCard = ({ reviewId }: props) => {
    let [review, setReview] = useState<ReviewResponse>()
    useEffect(() => {
        (async () => {
            const review = (await ShopService.getReview(reviewId)).data
            setReview(review)
        })()
    })
    return (
        <div> 
            {
                review?.userName
            }
        </div>
    )
}

export default ReviewCard