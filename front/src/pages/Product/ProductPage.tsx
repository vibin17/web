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
    return <div className={styles['product']}>
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
                </div>
            </>           
        }
    </div>
}

export default ProductPage