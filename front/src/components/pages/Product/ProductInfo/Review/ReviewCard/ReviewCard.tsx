import { useEffect, useMemo, useState } from "react"
import { ReviewResponse } from "../../../../../../services/models/shop-models"
import ShopService from "../../../../../../services/ShopService/shop-service"
import styles from './ReviewCard.module.scss'
import { BsStarFill } from 'react-icons/bs'
import { RiUserLine } from 'react-icons/ri'

type props = {
    reviewId: string
}

const ReviewCard = ({ reviewId }: props) => {
    let [review, setReview] = useState<ReviewResponse>()
    let date = useMemo(() => {
        return new Date(review?.reviewDate?? '01-01-2022')
    }, [review])
    useEffect(() => {
        (async () => {
            const review = (await ShopService.getReview(reviewId)).data
            setReview(review)
        })()
    })
    return (
        <div className={styles['review-card']}>
            <div className={styles['card-header']}>
                <div className={styles['card-header__item']}>
                    <div className={styles['card-header__sub-item']}>
                        <RiUserLine className={styles['card-user-icon']}/>
                        <b> { review?.userName } </b>
                    </div>
                    <div className={`${styles['card-header__sub-item']}
                        ${styles['card-header__sub-item--rating']}`}>
                        Оценка товара: {review?.rating} 
                        <BsStarFill className={`${styles['card-star']}
                            ${styles['card-star--smaller']}`}/>
                    </div>
                </div>
                <div className={styles['card-header__item']}>
                    {`
                        ${date.getDate() < 10?
                            `0${date.getDate()}`
                            :
                            `${date.getDate()}`
                        }.${date.getMonth() + 1 < 10?
                            `0${date.getMonth() + 1}`
                            :
                            `${date.getMonth() + 1}` 
                        }.${date.getFullYear()}
                    `}
                </div>
            </div>
            <div className={styles['card-content']}>
                {
                    review?.content
                }
            </div>
        </div>
    )
}

export default ReviewCard