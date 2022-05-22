import { ProductResponse } from "../../services/models/shop-models"
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs'
import styles from './RatingStars.module.scss'
import React, { useEffect, useMemo, useState } from "react"

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
    let scores: ['5', '4', '3', '2', '1']  = useMemo(() => {
        return ['5', '4', '3', '2', '1']
    }, [])
    let starIconStyle = useMemo(() => {
        return !summaryCardMode? `${styles['rating__star-icon']}` 
        : 
        `${styles['rating__star-icon']} ${styles['rating__star-icon--smaller']}`
    }, [summaryCardMode])
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
    let stars = useMemo(() => {
        let stars = [0, 1, 2, 3, 4].map((index) => {
            return (
                <div key={index} className={styles['rating__star']}>
                    <BsStar
                        strokeWidth='0'
                        className={starIconStyle}/>
                </div>
            )
        })
        let lastFullStar = 0
        for (let i = 0; i <= averageRating - 1; i++) {
            stars[i] = (
                <div key={i} 
                    className={styles['rating__star']}>
                    <BsStarFill
                        className={starIconStyle}
                    />
                </div>
            )
            lastFullStar++
        }
        if (averageRating % 1 >= 0.5) {
            stars[lastFullStar] = (                      
                <div key={lastFullStar} className={styles['rating__star']}>
                    <BsStarHalf
                        className={starIconStyle}/>
                </div>
            )
        }
        return stars
    }, [averageRating, totalReviews])

    useEffect(() => {
        (async () => {
            calcAverageRating()
        })()
    }, [rating])
    return (
        <div className={`${styles['rating']} ${!rightAligned && styles['rating--left-aligned']}`}>
            <div className={styles['rating__stars']}> 
                {
                    stars
                } 
            </div>
            {!summaryCardMode &&
                <div className={styles['rating__label']}> 
                    Рейтинг 
                    <span className={styles['rating__label-value']}> {Math.floor(averageRating * 10) / 10} </span>
                    на основе
                    <span className={styles['rating__label-value']}> {totalReviews} </span>
                    оценок
                </div>
            }
        </div>
    )
}

export default RatingStars