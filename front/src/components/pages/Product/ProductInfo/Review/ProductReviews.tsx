import { useEffect, useMemo, useState } from 'react'
import { ReviewIdResponse } from '../../../../../services/models/shop-models'
import ShopService from '../../../../../services/ShopService/shop-service'
import styles from './ProductReviews.module.scss'
import ReviewCard from './ReviewCard/ReviewCard'
import { BsStarFill } from 'react-icons/bs'

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
    let [reviewIds, setReviewIds] = useState<ReviewIdResponse[]>([])
    let [averageRating, setAverageRating] = useState(0)
    let [totalReviews, setTotalReviews] = useState(0)
    let reviewCards = useMemo(() => {
        return reviewIds.map((id, index) => {
            return <ReviewCard reviewId={id._id} key={index}/>
        })
    }, [reviewIds])
    let calcAverageRating = useMemo(() => {
        return () => {
            let totalRating = 0
            let totalReviews = 0
            let scores: ['5', '4', '3', '2', '1'] = ['5', '4', '3', '2', '1']
            for (let i = 0; i < 5; i++) {
                let currentScore = scores[i]
                totalRating += parseInt(currentScore) * rating[currentScore]
                totalReviews += rating[currentScore]
            }
            setTotalReviews(totalReviews)
            setAverageRating(totalRating / totalReviews)
        }
    }, [])
    useEffect(() => {
        (async () => {
            calcAverageRating()
            const reviewIds = (await ShopService.getAllReviewIdsForProduct(productId)).data
            setReviewIds(reviewIds)
        })()
    }, [])
    return (
        <div className={`${styles['reviews']}`}> 
            <aside className={styles['reviews-summary']}>
                <div className={styles['reviews-summary__item']}>
                    Общая оценка
                    <div className={styles['reviews-summary__star']}>
                        <div className={styles['reviews-summary__star-inside']}>
                            {
                                averageRating
                            }
                        </div>
                        <BsStarFill className={styles['reviews-summary__star-icon']}/>
                    </div>
                </div>
                <div className={styles['reviews-summary__item']}>
                    <div className={styles['reviews-summary__sub-item']}>
                        Всего оценок {totalReviews}
                    </div>
                    <div className={styles['reviews-summary__sub-item']}>
                        <div className={styles['reviews-summary__star']}>
                            <div className={`${styles['reviews-summary__star-inside']} 
                                ${styles['reviews-summary__star-inside--smaller']}`}>
                                5
                            </div>
                            <BsStarFill className={`${styles['reviews-summary__star-icon']}
                                ${styles['reviews-summary__star-icon--smaller']}`}/>
                        </div>
                        {rating['5']}
                    </div>
                    <div className={styles['reviews-summary__sub-item']}>
                        <div className={styles['reviews-summary__star']}>
                            <div className={`${styles['reviews-summary__star-inside']} 
                                ${styles['reviews-summary__star-inside--smaller']}`}>
                                4
                            </div>
                            <BsStarFill className={`${styles['reviews-summary__star-icon']}
                                ${styles['reviews-summary__star-icon--smaller']}`}/>
                        </div>
                        {rating['4']}
                    </div>
                    <div className={styles['reviews-summary__sub-item']}>
                        <div className={styles['reviews-summary__star']}>
                            <div className={`${styles['reviews-summary__star-inside']} 
                                ${styles['reviews-summary__star-inside--smaller']}`}>
                                3
                            </div>
                            <BsStarFill className={`${styles['reviews-summary__star-icon']}
                                ${styles['reviews-summary__star-icon--smaller']}`}/>
                        </div>
                        {rating['3']}
                    </div>
                    <div className={styles['reviews-summary__sub-item']}>
                        <div className={styles['reviews-summary__star']}>
                            <div className={`${styles['reviews-summary__star-inside']} 
                                ${styles['reviews-summary__star-inside--smaller']}`}>
                                2
                            </div>
                            <BsStarFill className={`${styles['reviews-summary__star-icon']}
                                ${styles['reviews-summary__star-icon--smaller']}`}/>
                        </div>
                        {rating['2']}
                    </div>
                    <div className={styles['reviews-summary__sub-item']}>
                        <div className={styles['reviews-summary__star']}>
                            <div className={`${styles['reviews-summary__star-inside']} 
                                ${styles['reviews-summary__star-inside--smaller']}`}>
                                1
                            </div>
                            <BsStarFill className={`${styles['reviews-summary__star-icon']}
                                ${styles['reviews-summary__star-icon--smaller']}`}/>
                        </div>
                        {rating['1']}
                    </div>
                </div>
            </aside>
            <div className={styles['reviews-user-cards']}>
                {
                    reviewCards
                }
            </div>
        </div>
    )
}

export default ProductReviews