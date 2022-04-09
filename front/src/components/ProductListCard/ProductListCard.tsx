import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SHOP_URL } from '../../http'
import { ProductSummaryResponse } from '../../services/models/shop-models'
import ShopService from '../../services/ShopService/shop-service'
import RatingStars from '../RatingStars/RatingStars'
import styles from './ProductListCard.module.scss'

type props = {
    productId: string,
    cartMode?: boolean
}

const ProductListCard = ({ productId, cartMode = false }: props) => {
    let [product, setProduct] = useState<ProductSummaryResponse>()
    useEffect(() => {
        (async () => {
            let product = (await ShopService.getProductSummaryById(productId)).data
            setProduct(product)
        })()
    }, [])
    return (
        <Link to={`/products/${productId}`} className={styles['product-list-card']}>
            {product &&
                <>
                    <div className={styles['image-section']}>
                        <img className={styles['card-image']} src={`${SHOP_URL}/products/images/${product.imagePath}`}/>
                    </div>
                    <div className={styles['product-info']}>
                        <div className={styles['product-description']}> 
                            <div className={styles['product-name']}> {
                                product.productName
                            }
                            </div>
                            <div className={styles['product-rating']}>
                                <RatingStars rating={product.rating} listCardMode/>
                            </div>
                            <button className={styles['product-buy__button']}>
                                Добавить в избранное
                            </button>
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
                            {!cartMode ?
                                <button className={styles['product-buy__button']} 
                                    onClick={() => {
                                        
                                    }}
                                >
                                    Добавить в корзину
                                </button>
                                :
                                <button className={styles['product-buy__button']}
                                onClick={(event) => {
                                    
                                }}
                                >
                                    Удалить из корзины
                                </button>                       
                            }
                        </div>
                    </div>
                </>
            }
        </Link>
    )
}

export default ProductListCard