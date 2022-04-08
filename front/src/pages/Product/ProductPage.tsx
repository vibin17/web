import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { SHOP_URL } from "../../http"
import { ProductResponse } from "../../services/models/shop-models"
import ShopService from '../../services/ShopService/shop-service'
import styles from './ProductPage.module.scss'
import './image-gallery.scss';
import ImageGallery from 'react-image-gallery'
import RatingStars from "../../components/RatingStars/RatingStars"
import { BsCart2 } from "react-icons/bs"
import { FiHeart } from "react-icons/fi"
import ProductInfo from "./ProductInfo/ProductInfo"
import { useShopLocalActions } from "../../hooks/useActions"
import { AddToFavors } from "../../store/action-creators/shopLocalAction"

const ProductPage = () => {
    const params = useParams()
    let [product, setProduct] = useState<ProductResponse>()
    let { AddToCart } = useShopLocalActions()
    useEffect(() => {
        (async () => {
            setProduct((await ShopService.getProductById(params.id || 'undef')).data)
        })()
    }, [])
    return (
        <div className={styles['product']}>
            {product &&
                <>
                    <div className={styles['product-header']}>
                        {
                            product.productName
                        }
                    </div>
                    <div className={styles['product-main']}>
                        <div className={styles['product-gallery']}>
                            <ImageGallery
                                items={product.imagePaths.map((image) => {
                                    return {
                                        original:`${SHOP_URL}/products/images/${image}`,
                                        originalClass: styles['slider__og'],
                                        thumbnail:`${SHOP_URL}/products/images/${image}`,
                                        thumbnailClass: styles['slider__thumbnail'],        
                                    }
                                })}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showBullets
                                additionalClass={styles['slider']}
                            />
                        </div>
                        <div className={styles['product-buy']}>
                            <div className={styles['product-price']}>
                                {
                                    product.price + ' ₽'
                                }
                            </div>
                            <RatingStars rating={{
                                    '5': 0,
                                    '4': 1,
                                    '3': 1,
                                    '2': 0,
                                    '1': 0
                                }}/>
                            <button className={styles['product-button']} 
                                onClick={() => {
                                    if (product) {
                                        AddToCart(product._id, product.price)
                                    }
                                }}>
                                <BsCart2 className={styles['product-button__icon']}/>
                                Добавить в корзину
                            </button>

                            <button className={`${styles['product-button']} ${styles['product-button--favors']}`}
                                onClick={() => {
                                    if (product) {
                                        AddToFavors(product._id)
                                    }
                                }}>
                                <FiHeart className={styles['product-button__icon']}/>
                                Добавить в избранное
                            </button>
                        </div>
                    </div>
                    <div className={styles['product-info']}>
                        <ProductInfo product={product}/>
                    </div>
                </>           
            }
        </div>
    )
}

export default ProductPage