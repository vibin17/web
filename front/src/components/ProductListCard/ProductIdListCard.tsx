import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useShopLocalActions } from '../../hooks/useActions'
import { SHOP_URL } from '../../http'
import { ProductSummaryResponse } from '../../services/models/shop-models'
import ShopService from '../../services/ShopService/shop-service'
import RatingStars from '../RatingStars/RatingStars'
import styles from './ProductListCard.module.scss'

type props = {
    productId: string
    ordersHistoryMode?: boolean
    cardKey: number
    favored?: boolean
    cartMode?: boolean
}

const ProductIdListCard = ({ productId, cardKey, ordersHistoryMode = false, favored = false, cartMode = false }: props) => {
    let [product, setProduct] = useState<ProductSummaryResponse>()
    let { 
        addToFavors, 
        addToCart,
        removeFromFavors,
        removeFromCart 
        } = useShopLocalActions()
    useEffect(() => {
        (async () => {
            let product = (await ShopService.getProductSummaryById(productId)).data
            setProduct(product)
        })()
    }, [])
    return (
        <Link to={`/products/${productId}`} 
            className={`${styles['product-list-card']} ${ordersHistoryMode &&
                styles['product-list-card--smaller']}`}>
            {product &&
                <>
                    <div className={styles['image-section']}>
                        <img 
                            className={`${styles['card-image']} ${ordersHistoryMode &&
                                styles['card-image--smaller']}`} 
                            src={`${SHOP_URL}/products/images/${product.imagePath}`}
                        />
                    </div>
                    <div className={styles['product-info']}>
                        <div className={styles['product-description']}> 
                            <div className={`${styles['product-name']} 
                                ${ordersHistoryMode && styles['product-name--smaller']}`}> 
                                {
                                    product.productName
                                }
                            </div>
                            {!ordersHistoryMode &&
                                <div className={styles['product-rating']}>
                                    <RatingStars 
                                        rating={
                                            // product.rating
                                            // {
                                            //     '5': 3,
                                            //     '4': 3,
                                            //     '3': 2,
                                            //     '2': 0,
                                            //     '1': 1
                                            // }
                                            {
                                                '5': Math.floor(Math.random() * 100),
                                                '4': Math.floor(Math.random() * 80),
                                                '3': Math.floor(Math.random() * 15),
                                                '2': Math.floor(Math.random() * 10),
                                                '1': Math.floor(Math.random() * 10)
                                            }
                                        } 
                                    />
                                </div>
                            }
                            {!ordersHistoryMode && (!favored?
                                <button className={styles['product-buy__button']}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        if (product) {
                                            addToFavors(product._id)
                                        }
                                    }}
                                >
                                    Добавить в избранное
                                </button>
                                :
                                <button className={styles['product-buy__button']}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        if (product) {
                                            removeFromFavors(product._id)
                                        }
                                    }}
                                >
                                    В избранном
                                </button>
                            )}
                        </div>
                        <div className={styles['product-buy']}
                            onClick={(event) => {
                                event.preventDefault()
                            }}
                        >
                            <div className={styles['product-price']}> {
                                product.price + ' ₽'
                            }
                            </div>
                            {!ordersHistoryMode && (!cartMode?
                                <button className={styles['product-buy__button']} 
                                    onClick={() => {
                                        if (product) {
                                            addToCart(product?._id, product?.price)
                                        }
                                    }}
                                >
                                    Добавить в корзину
                                </button>
                                :
                                <button className={styles['product-buy__button']}
                                onClick={() => {
                                    if (product) {
                                        removeFromCart(cardKey, product.price)
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 100)
                                    }
                                }}
                                >
                                    Удалить из корзины
                                </button>                       
                            )}
                        </div>
                    </div>
                </>
            }
        </Link>
    )
}

export default ProductIdListCard