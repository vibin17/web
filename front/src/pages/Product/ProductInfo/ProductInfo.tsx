import { useState } from 'react'
import { ProductResponse } from '../../../services/models/shop-models'
import styles from './ProductInfo.module.scss'

type props = {
    product: ProductResponse
}

const ProductInfo = ({ product }: props) => {
    let [reviewsTabActive, setReviewsTabActive] = useState(false)
    return (
        <div className={styles['menu']}>
            <div className={styles['menu-navbar']}>
                <button 
                    className={`${styles['menu-navbar__button']} ${reviewsTabActive? 
                        styles['menu-navbar__button--inactive'] 
                        : 
                        styles['menu-navbar__button--active']}`}
                    onClick={() => { setReviewsTabActive(false) }}
                >
                    Описание товара
                </button>
                <button 
                    className={`${styles['menu-navbar__button']} ${reviewsTabActive? 
                        styles['menu-navbar__button--active'] 
                        : 
                        styles['menu-navbar__button--inactive']}`}
                    onClick={() => { setReviewsTabActive(true) }}
                >
                    Отзывы о товаре
                </button>
            </div>
            <div className={`${styles['menu-content']} ${reviewsTabActive?
                        styles['menu-content--reviews']
                        : 
                        styles['menu-content--description']}`}>
                {!reviewsTabActive &&
                    <div className={styles['product-info']}>

                        <div className={styles['product-info__description']}>
                            {
                                product.description.split(/\r?\n/).map((par, index) => {
                                    return (
                                        <p key={index} className={styles['product-info__description-paragraph']}> 
                                            {
                                                par
                                            } 
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <div className={styles['product-info__props']}>
                            <div className={styles['product-info__prop-row']}>
                                <div className={styles['product-info__prop-name']}>
                                    Производитель
                                </div>
                                <div className={styles['product-info__prop-separator']}/>
                                <div className={styles['product-info__prop-value']}>
                                    {
                                        product.manufacturer
                                    }
                                </div>
                            </div>
                            <div className={styles['product-info__prop-row']}>
                                <div className={styles['product-info__prop-name']}>
                                    Год выпуска
                                </div>
                                <div className={styles['product-info__prop-separator']}/>
                                <div className={styles['product-info__prop-value']}>
                                    {
                                        product.releaseYear
                                    }
                                </div>
                            </div>       
                            {
                                product.props.map((prop, index) => {
                                    return (
                                        <div key={index} className={styles['product-info__prop-row']}>
                                            <div className={styles['product-info__prop-name']}>
                                                {
                                                    product.category.props[index]
                                                }
                                            </div>
                                            <div className={styles['product-info__prop-separator']}/>
                                            <div className={styles['product-info__prop-value']}>
                                                {
                                                    prop
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
    
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductInfo