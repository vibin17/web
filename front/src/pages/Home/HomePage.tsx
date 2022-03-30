import { useEffect, useRef, useState } from 'react'
import { ProductIdResponse } from '../../services/models/shop-models'
import ShopService from '../../services/ShopService/shop-service'
import styles from './HomePage.module.scss'
import ProductSummaryCard from './ProductSummaryCard/ProductSummaryCard'

const HomePage = () => {
    let [productIds, setProductIds] = useState<ProductIdResponse[]>([])
    useEffect(() => {
        (async () => {
            setProductIds((await ShopService.getAllProducts()).data)
            console.log('HOME', (await ShopService.getAllProducts()).data)
        })()
    }, [])
    return (
        <div className={styles['homepage']}>
            <section className={styles['products-section']}>
                <div className={styles['section-header']}>
                    Новые товары
                </div>
                <div className={styles['section-content']}>
                    {
                        productIds.map((productId) => {
                            return <ProductSummaryCard productId={productId._id}/>
                        })
                    }
                </div>

            </section>
        </div>
    )
}

export default HomePage