import { useEffect, useMemo, useState } from 'react'
import { CategoryResponse, ProductResponse } from '../../../../services/models/shop-models'
import ShopService from '../../../../services/ShopService/shop-service'
import ProductCharacteristics from './ProductCharacteristics/ProductCharacteristics'
import styles from './ProductInfo.module.scss'
import ProductReviews from './ProductReviews/ProductReviews'

type props = {
    product: ProductResponse
}

const ProductInfo = ({ product }: props) => {
    let [reviewsTabActive, setReviewsTabActive] = useState(false)

    return (
        <div className={styles['product-info']}>
            <div className={styles['product-info__menu']}>
                <div className={styles['product-info__menu-navbar']}>
                    <button 
                        className={`${styles['product-info__menu-button']} ${reviewsTabActive? 
                            styles['product-info__menu-button--inactive'] 
                            : 
                            styles['product-info__menu-button--active']}`}
                        onClick={() => { setReviewsTabActive(false) }}
                    >
                        Описание товара
                    </button>
                    <button 
                        className={`${styles['product-info__menu-button']} ${reviewsTabActive? 
                            styles['product-info__menu-button--active'] 
                            : 
                            styles['product-info__menu-button--inactive']}`}
                        onClick={() => { setReviewsTabActive(true) }}
                    >
                        Отзывы о товаре
                    </button>
                </div>
            </div>
            <div className={`${styles['product-info__content']} ${reviewsTabActive?
                            styles['product-info__content--reviews']
                            : 
                            styles['product-info__content--description']}`}>
                    {!reviewsTabActive?
                        <ProductCharacteristics product={product}/>
                        :
                        <ProductReviews productId={product._id} rating={product.rating}/>
                    }
                </div>
        </div>
    )
}

export default ProductInfo