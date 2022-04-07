import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SHOP_URL } from '../../../http'
import { ProductSummaryResponse } from '../../../services/models/shop-models'
import ShopService from '../../../services/ShopService/shop-service'
import styles from './ProductSummaryCard.module.scss'

type props = {
    productId: string
}

const ProductSummaryCard = ({ productId }: props) => {
    let [product, setProduct] = useState<ProductSummaryResponse>()
    useEffect(() => {
        (async () => {
            let product = (await ShopService.getProductSummaryById(productId)).data
            setProduct(product)
        })()
    }, [])
    return (
        <Link to={`products/${productId}`} className={styles['product-card']}>
            {product &&
                <>
                    <div className={styles['image-section']}>
                        <img className={styles['card-image']} src={`${SHOP_URL}/products/images/${product?.imagePath}`}/>
                    </div>
                    <div className={styles['product-info']}>
                        <div className={styles['product-name']}> {
                            product.productName
                        }</div>
                        <div className={styles['product-price']}> {
                            product.price + ' ₽'
                        }</div>
                    </div>
                </>
            }

        </Link>
    )
}

export default ProductSummaryCard