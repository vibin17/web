import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { SHOP_URL } from "../../../http"
import { CategoryResponse, ProductResponse } from "../../../services/models/shop-models"
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
import { Link } from "react-router-dom"

const ProductPage = () => {
    const id = useParams().id
    let [product, setProduct] = useState<ProductResponse>()
    let [category, setCategory] = useState<CategoryResponse>()
    let [isFavored, setIsFavored] =  useState(false)
    let { addToCart, addToFavors, removeFromFavors } = useShopLocalActions()
    let [lastSeen, setLastSeen] = useState<string[]>([])
    let stock = Math.floor(Math.random() * 10) % 3
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
            const allCategories = (await ShopService.getCategories()).data
            const category = allCategories.find((cat) => cat.name === product.category)
            setCategory(category)
            let favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
            if (favors.includes(product._id)) {
                setIsFavored(true)
            }
            let lastSeen: string[] = await JSON.parse(localStorage.getItem('last-seen')?? '[]')
            if (lastSeen.includes(product._id)) {
                let index = lastSeen.findIndex((id) => id === product._id)
                lastSeen = [...lastSeen.slice(0, index), ...lastSeen.slice(index + 1)]
            }
            setLastSeen(lastSeen)
            let newLastSeen = lastSeen.slice(-4)
            newLastSeen.push(product._id)
            localStorage.setItem('last-seen', JSON.stringify(newLastSeen))          
        })()
    }, [id])
    return (
        <div className={styles['product']}>
            {product &&
                <>
                    <div className={styles['product__header']}>
                        <div className={styles['product__name']}>
                            {
                                product.productName
                            }
                        </div>
                        <Link className={styles['product__category']} to={`catalogue/${category?.route}`}>
                            {
                                category?.name
                            }
                        </Link>
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
                            <RatingStars rating={product.rating} 
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
                            <div className={styles['product__stock']}>
                                {
                                   stock?
                                        <>В наличии в <b>{
                                            stock
                                        }</b> магазинах</>
                                    :
                                        `Нет в наличии`
                                }
                            </div>
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