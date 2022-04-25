import { ProductResponse } from "../../services/models/shop-models"
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs'
import styles from './RatingStars.module.scss'
import React, { useEffect, useState } from "react"

type props = {
    rating: {
        '5': number
        '4': number
        '3': number
        '2': number
        '1': number
    },
    rightAligned?: boolean
    summaryCardMode?: boolean
}

const RatingStars = ({ rating, rightAligned = false, summaryCardMode = false }: props) => {
    let [averageRating, setAverageRating] = useState(0)
    let [totalReviews, setTotalReviews] = useState(0)
    let [stars, setStars] = useState<React.ReactNode[]>([])
    let starIconStyle = !summaryCardMode? `${styles['star__icon']}` 
        : 
        `${styles['star__icon']} ${styles['star__icon--smaller']}`
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
            let lastFullStar = 0
            for (let i = 0; i < 5; i++) {
                if (i + 1 <= averageRating) {
                    stars.push(
                        <div key={i} className={styles['star']}>
                            <BsStarFill
                                className={starIconStyle}/>
                        </div>
                    )
                    lastFullStar++
                } else {
                    stars.push(
                        <div key={i} className={styles['star']}>
                            <BsStar
                                strokeWidth='0'
                                className={starIconStyle}/>
                        </div>
                    )
                }
            }
            if (averageRating % 1 >= 0.5) {
                stars[lastFullStar] = (                      
                    <div key={lastFullStar} className={styles['star']}>
                        <BsStarHalf
                            className={starIconStyle}/>
                    </div>
                )
            }
            setStars(stars)
        })()
    }, [])
    return (
        <div className={`${styles['rating']} ${!rightAligned && styles['rating--left-aligned']}`}>
            <div className={styles['rating-stars']}> {
                stars
            } </div>
            {!summaryCardMode &&
                <div className={styles['rating-label']}> 
                    Рейтинг 
                    <span className={styles['rating-label__value']}> {averageRating.toFixed(2)} </span>
                    на основе
                    <span className={styles['rating-label__value']}> {totalReviews} </span>
                    оценок
                </div>
            }
        </div>
    )
}

export default RatingStars