import { useEffect, useRef, useState } from 'react'
import { ProductIdResponse } from '../../services/models/shop-models'
import ShopService from '../../services/ShopService/shop-service'
import styles from './HomePage.module.scss'
import ProductSummaryCard from './ProductSummaryCard/ProductSummaryCard'

const HomePage = () => {
    let [productIds, setProductIds] = useState<ProductIdResponse[]>([])
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
                    {productIds.length &&
                        // productIds.map((productId) => {
                        //     return <ProductSummaryCard productId={productId._id}/>
                        // })
                        <>
                            <ProductSummaryCard productId={productIds[0]._id}/>
                            <ProductSummaryCard productId={productIds[0]._id}/>
                            <ProductSummaryCard productId={productIds[0]._id}/>
                            <ProductSummaryCard productId={productIds[0]._id}/>
                            <ProductSummaryCard productId={productIds[0]._id}/>
                        </>
                    }
                </div>

            </section>
        </div>
    )
}

export default HomePage