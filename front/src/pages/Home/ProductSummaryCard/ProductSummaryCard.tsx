import { useEffect, useState } from 'react'
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
            console.log((await ShopService.getProductSummaryById(productId)).data)
            setProduct((await ShopService.getProductSummaryById(productId)).data)
        })()
    }, [])
    return (
        <div className={styles['product-card']}>
            <div className={styles['image-section']}>
                <img className={styles['card-image']} src={`${SHOP_URL}/products/images/${product?.imagePath}`}/>
            </div>
            <div className={styles['product-info']}>
                <div className={styles['product-name']}> {
                    product?.productName
                }</div>
                <div className={styles['product-price']}> {
                    product?.price
                }</div>
            </div>
        </div>
    )
}

export default ProductSummaryCard