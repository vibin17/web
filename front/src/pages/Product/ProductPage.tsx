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

const ProductPage = () => {
    const params = useParams()
    let [product, setProduct] = useState<ProductResponse>()
    let [isFavored, setIsFavored] =  useState(false)
    let { addToCart, addToFavors } = useShopLocalActions()
    useEffect(() => {
        (async () => {
            const product = (await ShopService.getProductById(params.id || 'undef')).data
            setProduct(product)
            let favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
            if (favors.includes(product._id)) {
                setIsFavored(true)
            } 
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
                                }} 
                                rightAligned
                            />
                            <button className={styles['product-button']} 
                                onClick={() => {
                                    if (product) {
                                        addToCart(product._id, product.price)
                                    }
                                }}>
                                <BsCart2 className={styles['product-button__icon']}/>
                                Добавить в корзину
                            </button>
                            {!isFavored?
                                <button className={`${styles['product-button']} ${styles['product-button--favors']}`}
                                    onClick={() => {
                                        if (product) {
                                            addToFavors(product._id)
                                            setIsFavored(true)
                                        }
                                    }}>
                                    <FiHeart className={styles['product-button__icon']}/>
                                    Добавить в избранное
                                </button>
                                :
                                <button className={`${styles['product-button']} ${styles['product-button--favors']}`}>
                                    <FiHeart className={styles['product-button__icon']}/>
                                    В избранном
                                </button>
                            }
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