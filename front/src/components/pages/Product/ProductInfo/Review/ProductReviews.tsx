import { useEffect, useMemo, useState } from 'react'
import { ReviewIdResponse } from '../../../../../services/models/shop-models'
import ShopService from '../../../../../services/ShopService/shop-service'
import styles from './ProductReview.module.scss'
import ReviewCard from './ReviewCard/ReviewCard'

type props = {
    productId: string
}

const ProductReviews = ({ productId}: props) => {
    let [reviewIds, setReviewIds] = useState<ReviewIdResponse[]>([])
    let reviewCards = useMemo(() => {
        return reviewIds.map((id, index) => {
            return <ReviewCard reviewId={id._id} key={index}/>
        })
    }, [reviewIds])
    useEffect(() => {
        (async () => {
            const reviewIds = (await ShopService.getAllReviewIdsForProduct(productId)).data
            setReviewIds(reviewIds)
        })()
    }, [])
    return (
        <div> 
            {
                reviewCards
            }
        </div>
    )
}

export default ProductReviews