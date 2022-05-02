import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useShopLocalActions } from '../../hooks/useActions'
import { SHOP_URL } from '../../http'
import { ProductResponse, ProductSummaryResponse } from '../../services/models/shop-models'
import ShopService from '../../services/ShopService/shop-service'
import RatingStars from '../RatingStars/RatingStars'
import styles from './ProductListCard.module.scss'

type props = {
    product: ProductResponse
    favored?: boolean
    cardKey: number
}

const ProductObjectListCard = ({ product, cardKey, favored = false }: props) => {
    let { 
        addToFavors, 
        addToCart,
        removeFromFavors,
        removeFromCart 
        } = useShopLocalActions()
    useEffect(() => {
        // (async () => {
        //     let product = (await ShopService.getProductSummaryById(productId)).data
        //     setProduct(product)
        // })()
    }, [])
    return (
        <Link to={`/products/${product._id}`} 
            className={`${styles['product-list-card']}`}>
            <div className={styles['image-section']}>
                <img 
                    className={`${styles['card-image']}`} 
                    src={`${SHOP_URL}/products/images/${product.imagePaths[0]}`}
                />
            </div>
            <div className={styles['product-info']}>
                <div className={styles['product-description']}> 
                    <div className={styles['product-name']}> {
                        product.productName
                    }
                    </div>
                    <div className={styles['product-rating']}>
                            <RatingStars 
                                rating={
                                    // product.rating
                                    {
                                        '5': 3,
                                        '4': 3,
                                        '3': 2,
                                        '2': 0,
                                        '1': 1
                                    }
                                } 
                            />
                    </div>
                    {!favored?
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
                            }}
                        >
                            В избранном
                        </button>
                    }
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
                    <button className={styles['product-buy__button']} 
                            onClick={() => {
                                if (product) {
                                    addToCart(product?._id, product?.price)
                                }
                            }}
                    >
                            Добавить в корзину
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ProductObjectListCard