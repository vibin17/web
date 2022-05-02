import { useEffect, useMemo, useState } from "react"
import { ReviewResponse } from "../../../../../../services/models/shop-models"
import ShopService from "../../../../../../services/ShopService/shop-service"
import styles from './ReviewCard.module.scss'
import { BsStarFill } from 'react-icons/bs'
import { RiUserLine } from 'react-icons/ri'

type props = {
    reviewId: string
    highlighted?: boolean
}

const ReviewCard = ({ reviewId, highlighted = false }: props) => {
    let [review, setReview] = useState<ReviewResponse>()
    let date = useMemo(() => {
        return new Date(review?.reviewDate?? '01-01-2022')
    }, [review])
    useEffect(() => {
        (async () => {
            const review = (await ShopService.getReview(reviewId)).data
            setReview(review)
        })()
    }, [reviewId])
    return (
        <div className={`${styles['review-card']}
            ${highlighted && styles['review-card--highlighted']}`}>
            <div className={styles['review-card__header']}>
                {
                    highlighted &&
                        <>
                            <div className={styles['review-card__header-row']}>
                                Ваш отзыв
                                <button className={styles['review-card__delete-btn']}
                                    onClick={async () => {
                                        const result = await ShopService.deleteReview(review?.product || 'error')
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1000)
                                    }}>
                                    Удалить отзыв
                                    <div className={styles['review-card__btn-xmark']}/>
                                </button>
                            </div>
                        </>
                }
                <div className={styles['review-card__header-row']}>
                    <div className={styles['review-card__header-item']}>
                        <div className={styles['review-card__header-sub-item']}>
                            <RiUserLine className={styles['review-card__user-icon']}/>
                            <b> { review?.userName } </b>
                        </div>
                        <div className={`${styles['review-card__header-sub-item']}
                            ${styles['review-card__header-sub-item--rating']}`}>
                            Оценка товара: {review?.rating} 
                            <BsStarFill className={`${styles['review-card__star']}
                                ${styles['review-card__star--smaller']}`}/>
                        </div>
                    </div>
                    <div className={styles['review-card__header-item']}>
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
            </div>
            <div className={styles['review-card__content']}>
                {
                    review?.content.split(/\r?\n/).map((par, index) => {
                        return (
                            <p key={index} className={styles['review-card__content-paragraph']}> 
                                {
                                    par
                                } 
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ReviewCard