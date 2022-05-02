import { useEffect, useMemo, useState } from 'react'
import { CategoryResponse, ProductResponse } from '../../../../../services/models/shop-models'
import ShopService from '../../../../../services/ShopService/shop-service'
import styles from './ProductCharacteristics.module.scss'

type props = {
    product: ProductResponse
}

const ProductCharacteristics = ({product}: props) => {
    let [category, setCategory] = useState<CategoryResponse>()
    let props = useMemo(() => {
        return product.props.map((prop, index) => {
            return (
                <div key={index} className={styles['product-characteristics__prop-row']}>
                    <div className={styles['product-characteristics__prop-name']}>
                        {
                            category?.props[index].name
                        }
                    </div>
                    <div className={styles['product-characteristics__prop-separator']}/>
                    <div className={styles['product-characteristics__prop-value']}>
                        {
                            prop
                        }
                    </div>
                </div>
            )
        })
    }, [category])
    useEffect(() => {
        (async () => {
            let allCategories = (await ShopService.getCategories()).data
            let category = allCategories.find((category) =>
                category.name == product.category
            )
            setCategory(category)
        })()
    }, [])
    return (
        <div className={styles['product-characteristics']}>

                        <div className={styles['product-characteristics__description']}>
                            {
                                product.description.split(/\r?\n/).map((par, index) => {
                                    return (
                                        <p key={index} className={styles['product-characteristics__description-paragraph']}> 
                                            {
                                                par
                                            } 
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <div className={styles['product-characteristics__props']}>
                            <div className={styles['product-characteristics__prop-row']}>
                                <div className={styles['product-characteristics__prop-name']}>
                                    Производитель
                                </div>
                                <div className={styles['product-characteristics__prop-separator']}/>
                                <div className={styles['product-characteristics__prop-value']}>
                                    {
                                        product.manufacturer
                                    }
                                </div>
                            </div>
                            <div className={styles['product-characteristics__prop-row']}>
                                <div className={styles['product-characteristics__prop-name']}>
                                    Год выпуска
                                </div>
                                <div className={styles['product-characteristics__prop-separator']}/>
                                <div className={styles['product-characteristics__prop-value']}>
                                    {
                                        product.releaseYear
                                    }
                                </div>
                            </div>       
                            {
                                props
                            }
                        </div>
    
                    </div>
    )
}

export default ProductCharacteristics