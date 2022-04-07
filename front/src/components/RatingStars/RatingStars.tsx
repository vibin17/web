import { ProductResponse } from "../../services/models/shop-models"
import { BsStar, BsStarFill } from 'react-icons/bs'
import styles from './RatingStars.module.scss'
import React, { useEffect, useState } from "react"

type props = {
    rating: {
        '5': number
        '4': number
        '3': number
        '2': number
        '1': number
    }
}

const RatingStars = ({ rating }: props) => {
    let [averageRating, setAverageRating] = useState(0)
    let [totalReviews, setTotalReviews] = useState(0)
    let [stars, setStars] = useState<React.ReactNode[]>([])
    useEffect(() => {
        (async () => {
            let totalRating = 0
            let totalReviews = 0
            let scores: ['5', '4', '3', '2', '1'] = ['5', '4', '3', '2', '1']
            for (let i = 0; i < 5; i++) {
                let currentScore = scores[i]
                totalRating += parseInt(currentScore) * rating[currentScore]
                totalReviews += rating[currentScore]
            }
            let averageRating = totalRating / totalReviews
            setAverageRating(averageRating)
            setTotalReviews(totalReviews)
            let stars: React.ReactNode[] = []
            for (let i = 0; i < 5; i++) {
                if (i + 1 <= averageRating) {
                    stars.push(
                        <div key={i} className={styles['star']}>
                            <BsStarFill
                                className={`${styles['star__icon']} ${styles['star__icon--filled']}`}/>
                        </div>
                    )
                } else {
                    stars.push(
                        <div key={i} className={styles['star']}>
                            <BsStar
                                strokeWidth='0'
                                className={`${styles['star__icon']}`}/>
                        </div>
                    )
                }
            }
            setStars(stars)
        })()
    }, [])
    return (
        <div className={styles['rating']}>
            <div className={styles['rating-stars']}> {
                stars
            } </div>
            <div className={styles['rating-label']}> 
                Рейтинг 
                    <span className={styles['rating-label__value']}> {averageRating} </span>
                на основе
                    <span className={styles['rating-label__value']}> {totalReviews} </span>
                оценок
            </div>
        </div>

    )
}

export default RatingStars