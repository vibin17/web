import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../RatingStars/RatingStars'
import { SHOP_URL } from '../../http'
import { ProductSummaryResponse } from '../../services/models/shop-models'
import ShopService from '../../services/ShopService/shop-service'
import styles from './ProductSummaryCard.module.scss'

type props = {
    productId: string
    smaller?: boolean
}

const ProductSummaryCard = ({ productId, smaller = false }: props) => {
    let [product, setProduct] = useState<ProductSummaryResponse>()
    useEffect(() => {
        (async () => {
            let product = (await ShopService.getProductSummaryById(productId)).data
            setProduct(product)
        })()
    }, [])
    return (
        <Link to={`/products/${productId}`} 
            className={`${styles['prod-sum-card']} ${smaller && styles['prod-sum-card--smaller']}`}
        >
            {product &&
                <>
                    <div className={styles['prod-sum-card__img-section']}>
                        <img className={styles['prod-sum-card__img']} src={`${SHOP_URL}/products/images/${product?.imagePath}`}/>
                    </div>
                    <div className={styles['prod-sum-card__info']}>
                        <div className={`${styles['prod-sum-card__name']} 
                            ${smaller && styles['prod-sum-card__name--smaller']}`}> 
                            {
                                product.productName
                            }
                        </div>
                        {!smaller &&
                            <div className={styles['prod-sum-card__additional']}>
                                <RatingStars rating={                                    {
                                        '5': Math.floor(Math.random() * 100),
                                        '4': Math.floor(Math.random() * 80),
                                        '3': Math.floor(Math.random() * 15),
                                        '2': Math.floor(Math.random() * 10),
                                        '1': Math.floor(Math.random() * 10)
                                    }} summaryCardMode/>
                                <div className={styles['prod-sum-card__price']}> 
                                    {
                                        `${product.price} ₽`
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </Link>
    )
}

export default ProductSummaryCard