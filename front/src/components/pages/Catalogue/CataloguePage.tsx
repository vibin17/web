import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { CategoryResponse, ProductIdResponse, ProductResponse } from "../../../services/models/shop-models"
import ShopService from "../../../services/ShopService/shop-service"
import ProductObjectListCard from "../../ProductListCard/ProductObjectListCard"
import styles from './CataloguePage.module.scss'

const CataloguePage = () => {
    const categoryRoute = useParams().categoryRoute
    let [productIds, setProductIds] = useState<ProductIdResponse[]>([])
    let [products, setProducts] = useState<ProductResponse[]>([])
    let [category, setCategory] = useState<CategoryResponse>()
    let favors = useMemo(() => {
        return JSON.parse(localStorage.getItem('favors')?? '[]')
    }, [])
    let productCards = useMemo(() => {
        return products.map((product, index) => {
            return <ProductObjectListCard product={product}
                cardKey={index} key={index} favored={favors.includes(product._id)}/>
        })
    }, [products])
    useEffect(() => {
        (async () => {
            const category = (await ShopService.getCategories()).data.find((category) => {
                return category.route == categoryRoute
            })
            setCategory(category)
            const productIds = (await ShopService.getAllProductsOfCategory(category?.name|| 'error')).data       
            setProductIds(productIds)
            const productsPromises = productIds.map(async (id) => {
                return (await ShopService.getProductById(id._id)).data
            })
            const products = await Promise.all(productsPromises)
            setProducts(products)
            console.log(productIds)
        })()
    }, [categoryRoute])

    return (
        <div className={styles['catalogue']}> 
            <div className={styles['catalogue__header']}>
                {
                    category?.name
                }
            </div>
            <div className={styles['catalogue__main']}>
                <div className={styles['catalogue__product-cards']}>
                    {
                        productCards
                    }
                </div>
            </div>
        </div>
    )
}

export default CataloguePage