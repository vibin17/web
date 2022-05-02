import { useEffect, useMemo, useRef, useState } from 'react'
import { ProductIdResponse } from '../../../services/models/shop-models'
import ShopService from '../../../services/ShopService/shop-service'
import styles from './HomePage.module.scss'
import ProductSummaryCard from './ProductSummaryCard/ProductSummaryCard'

const HomePage = () => {
    let [productIds, setProductIds] = useState<ProductIdResponse[]>([])
    let summaryCards = useMemo(() => {
        return productIds.map((productId, index) => {
            return <ProductSummaryCard productId={productId._id} key={index}/>
        })
    }, [productIds])
    useEffect(() => {
        (async () => {
            let productIds = (await ShopService.getAllProducts()).data
            setProductIds(productIds)
        })()
    }, [])
    return (
        <div className={styles['homepage']}>
            <section className={styles['section']}>
                <div className={styles['section-header']}>
                    Новые товары
                </div>
                <div className={styles['section-content']}>
                    {
                        summaryCards[0]
                    }
                </div>

            </section>
        </div>
    )
}

export default HomePage