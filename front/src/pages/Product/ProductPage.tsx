import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { SHOP_URL } from "../../http"
import { ProductResponse } from "../../services/models/shop-models"
import ShopService from '../../services/ShopService/shop-service'
import styles from './ProductPage.module.scss'
import './image-gallery.scss';
import ImageGallery from 'react-image-gallery'

const ProductPage = () => {
    const params = useParams()
    let [product, setProduct] = useState<ProductResponse>()
    let src=`${SHOP_URL}/products/images/${product?.imagePaths}`
    console.log(params)
    useEffect(() => {
        (async () => {
            setProduct((await ShopService.getProductById(params.id || 'undef')).data)
        })()
    }, [])
    return <div>
        {product &&
            <>
                <section className={styles['product-header']}>
                    {
                        product.productName
                    }
                </section>
                <section className={styles['product-main']}>
                    <div className={styles['product-gallery']}>
                        <ImageGallery
                            items={product.imagePaths.map((image) => {
                                return {
                                    original:`${SHOP_URL}/products/images/${image}`,
                                    originalClass: styles['product-gallery__og'],
                                    thumbnail:`${SHOP_URL}/products/images/${image}`,
                                    thumbnailClass: styles['product-gallery__thumbnail'],        
                                }
                            })}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            showBullets
                        />
                    </div>
                </section>
            </>           
        }
    </div>
}

export default ProductPage