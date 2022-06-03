import { useEffect, useMemo, useRef, useState } from 'react'
import { ProductIdResponse } from '../../../services/models/shop-models'
import ShopService from '../../../services/ShopService/shop-service'
import styles from './HomePage.module.scss'
import ProductSummaryCard from '../../ProductSummaryCard/ProductSummaryCard'
import ImageGallery from 'react-image-gallery'
import './image-gallery-home.scss';

const HomePage = () => {
    const cardsOnPage = 8
    let [productIds, setProductIds] = useState<ProductIdResponse[]>([])
    let summaryCards = useMemo(() => {
        return productIds.slice(-cardsOnPage).map((productId, index) => {
            return <ProductSummaryCard productId={productId._id} key={index}/>
        })
    }, [productIds])
    useEffect(() => {
        (async () => {
            let productIds = (await ShopService.getAllProducts()).data
            setProductIds(productIds.slice(-cardsOnPage))
        })()
    }, [])
    return (
        <div className={styles['homepage']}>
            <section className={styles['section']}>
                <div className={styles['section__header']}>
                    Хиты продаж
                </div>
                <div className={styles['section__content']}>
                    <div className={styles['gallery']}>
                        <ImageGallery
                            items={
                                [
                                    {
                                        original: `https://www.marketing91.com/wp-content/uploads/2018/05/Marketing-mix-of-Nikon-3.jpg`,
                                        originalClass: styles['slider__image-og']
                                    },
                                    {
                                        original:`https://www.dexerto.com/wp-content/uploads/2020/11/PlayStation-5-consoles-are-reportedly-dying-already-featured-image-e1605190044680.jpg`,
                                        originalClass: styles['slider__image-og']
                                    }
                                ]
                            }
                            showFullscreenButton={false}
                            showPlayButton={false}
                            showBullets
                            showThumbnails={false}
                            additionalClass={styles['slider']}
                        />
                    </div>
                </div>
            </section>
            <section className={styles['section']}>
                <div className={styles['section__header']}>
                    Новые товары
                </div>
                <div className={styles['section__content']}>
                    {
                        summaryCards[4]
                    }
                    {
                        summaryCards[1]
                    }
                    {
                        summaryCards[7]
                    }
                    {
                        summaryCards[3]
                    }
                    {
                        summaryCards[2]
                    }
                    {
                        summaryCards[6]
                    }
                    {
                        summaryCards[0]
                    }
                    {
                        summaryCards[5]
                    }
                </div>
            </section>
        </div>
    )
}

export default HomePage