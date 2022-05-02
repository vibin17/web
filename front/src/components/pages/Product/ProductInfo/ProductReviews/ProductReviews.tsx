import { useEffect, useMemo, useState } from 'react'
import { ReviewIdResponse } from '../../../../../services/models/shop-models'
import ShopService from '../../../../../services/ShopService/shop-service'
import styles from './ProductReviews.module.scss'
import ReviewCard from './ReviewCard/ReviewCard'
import { BsStarFill } from 'react-icons/bs'
import ReviewForm from './ReviewForm/ReviewForm'

type props = {
    productId: string,
    rating:  {
        '5': number
        '4': number
        '3': number
        '2': number
        '1': number
    }
}

const ProductReviews = ({ productId, rating }: props) => {
    const scores: ['5', '4', '3', '2', '1']  = useMemo(() => {
        return ['5', '4', '3', '2', '1']
    }, [])
    let [userReviewId, setUserReviewId] = useState<ReviewIdResponse>()
    let [reviewIds, setReviewIds] = useState<ReviewIdResponse[]>([])
    let [averageRating, setAverageRating] = useState(0)
    let [totalReviews, setTotalReviews] = useState(0)
    let reviewCards = useMemo(() => {
        return reviewIds.map((id, index) => {
            return <ReviewCard reviewId={id._id} key={index}/>
        })
    }, [reviewIds])
    let calcAverageRating = useMemo(() => {
        return async () => {
            let totalRating = 0
            let totalReviews = 0
            for (let i = 0; i < 5; i++) {
                let currentScore = scores[i]
                totalRating += parseInt(currentScore) * rating[currentScore]
                totalReviews += rating[currentScore]
            }
            setTotalReviews(totalReviews)
            if (totalReviews > 0) {
                setAverageRating(totalRating / totalReviews)
            }
        }
    }, [rating])
    let summaryRates = useMemo(() => {
        return scores.map((rate, index) => {
            return (
                <div className={styles['reviews__summary-sub-item']} key={index}>
                    <div className={styles['reviews__summary-star']}>
                        <div className={`${styles['reviews__summary-star-inside']} 
                            ${styles['reviews__summary-star-inside--smaller']}`}>
                                {
                                    rate
                                }
                        </div>
                        <BsStarFill className={`${styles['reviews__summary-star-icon']}
                            ${styles['reviews__summary-star-icon--smaller']}`}/>
                    </div>
                    {
                        rating[rate]
                    }
                </div>
            )
        })
    }, [])
    useEffect(() => {
        (async () => {
            calcAverageRating()
            const reviewIds = (await ShopService.getAllReviewIdsForProduct(productId)).data
            setUserReviewId(reviewIds.userReview)
            setReviewIds(reviewIds.reviews)
        })()
    }, [])
    return (
        <div className={`${styles['reviews']}`}>
            <aside className={styles['reviews__summary']}>
                <div className={styles['reviews__summary-item']}>
                    Общая оценка
                    <div className={styles['reviews__summary-star']}>
                        <div className={styles['reviews__summary-star-inside']}>
                            {
                                averageRating
                            }
                        </div>
                        <BsStarFill className={styles['reviews__summary-star-icon']}/>
                    </div>
                </div>
                <div className={styles['reviews__summary-item']}>
                    <div className={styles['reviews__summary-sub-item']}>
                        Всего оценок: {totalReviews}
                    </div>
                    {
                        summaryRates
                    }
                </div>
            </aside>
            <div className={styles['reviews__user-cards']}>
                {
                    userReviewId? 
                        <ReviewCard reviewId={userReviewId._id} highlighted/>
                        :
                        <ReviewForm product={productId}/>
                }
                {
                    reviewCards[0]
                }
                                {
                    reviewCards[0]
                }
                                                {
                    reviewCards[0]
                }
                                                {
                    reviewCards[0]
                }
            </div>
        </div>
    )
}

export default ProductReviews