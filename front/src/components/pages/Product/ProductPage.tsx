import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { SHOP_URL } from "../../../http"
import { ProductResponse } from "../../../services/models/shop-models"
import ShopService from '../../../services/ShopService/shop-service'
import styles from './ProductPage.module.scss'
import './image-gallery.scss';
import ImageGallery from 'react-image-gallery'
import RatingStars from "../../RatingStars/RatingStars"
import { BsCart2 } from "react-icons/bs"
import { FiHeart } from "react-icons/fi"
import ProductInfo from "./ProductInfo/ProductInfo"
import { useShopLocalActions } from "../../../hooks/useActions"
import ProductSummaryCard from "../../ProductSummaryCard/ProductSummaryCard"

const ProductPage = () => {
    const id = useParams().id
    let [product, setProduct] = useState<ProductResponse>()
    let [isFavored, setIsFavored] =  useState(false)
    let { addToCart, addToFavors, removeFromFavors } = useShopLocalActions()
    let [lastSeen, setLastSeen] = useState<string[]>([])
    let gallery = useMemo(() => {
        return (
            <ImageGallery
                items={product? 
                    product.imagePaths.map((image) => {
                    return {
                        original:`${SHOP_URL}/products/images/${image}`,
                        originalClass: styles['slider__image-og'],
                        thumbnail:`${SHOP_URL}/products/images/${image}`,
                        thumbnailClass: styles['slider__image-thumbnail'],        
                    }})
                    :
                    []
                }
                showFullscreenButton={false}
                showPlayButton={false}
                showBullets
                additionalClass={styles['slider']}
            />
        )
    }, [product])
    useEffect(() => {
        (async () => {
            const product = (await ShopService.getProductById(id || 'undef')).data
            setProduct(product)
            let favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
            if (favors.includes(product._id)) {
                setIsFavored(true)
            }
            let lastSeen: string[] = await JSON.parse(localStorage.getItem('last-seen')?? '[]')
            setLastSeen(lastSeen)

            if (!lastSeen.includes(product._id)) {
                let newLastSeen = lastSeen.slice(-4)
                newLastSeen.push(product._id)
                localStorage.setItem('last-seen', JSON.stringify(newLastSeen))
            }
        })()
    }, [id])
    return (
        <div className={styles['product']}>
            {product &&
                <>
                    <div className={styles['product__header']}>
                        {
                            product.productName
                        }
                    </div>
                    <div className={styles['product__main']}>
                        <div className={styles['product__gallery']}>
                            {
                                gallery
                            }
                        </div>
                        <div className={styles['product__buy-section']}>
                            <div className={styles['product__price']}>
                                {
                                    product.price + ' ₽'
                                }
                            </div>
                            <RatingStars rating={{
                                    '5': 1,
                                    '4': 1,
                                    '3': 1,
                                    '2': 1,
                                    '1': 0
                                }} 
                                rightAligned
                            />
                            <button className={styles['product__button']} 
                                onClick={() => {
                                    if (product) {
                                        addToCart(product._id, product.price)
                                    }
                                }}>
                                <BsCart2 className={styles['product__button-icon']}/>
                                Добавить в корзину
                            </button>
                            {!isFavored?
                                <button className={`${styles['product__button']}
                                    ${styles['product__button--favors']}`}
                                    onClick={() => {
                                        if (product) {
                                            addToFavors(product._id)
                                            setIsFavored(true)
                                        }
                                    }}
                                >
                                    <FiHeart className={styles['product__button-icon']}/>
                                    Добавить в избранное
                                </button>
                                :
                                <button className={`${styles['product__button']}
                                    ${styles['product__button--favors']}`}
                                    onClick={() => {
                                        if (product) {
                                            removeFromFavors(product._id)
                                            setIsFavored(false)
                                        }
                                    }}
                                >
                                    <FiHeart className={styles['product__button__icon']}/>
                                    В избранном
                                </button>
                            }
                        </div>
                    </div>
                    <ProductInfo product={product}/>
                    <div className={styles['product__footer']}>
                        <div className={styles['product__last-seen']}>
                            <div className={styles['product__last-seen-label']}>
                                Вы недавно смотрели
                            </div>
                            <div className={styles['product__last-seen-cards']}>
                                {
                                    lastSeen.filter((prod) => prod !== product?._id).map((id, index) => {
                                        return (
                                            <ProductSummaryCard productId={id} 
                                                key={index}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </>           
            }
        </div>
    )
}

export default ProductPage