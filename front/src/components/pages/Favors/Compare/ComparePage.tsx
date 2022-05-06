import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { CategoryResponse, ProductResponse } from "../../../../services/models/shop-models"
import ShopService from "../../../../services/ShopService/shop-service"
import styles from './ComparePage.module.scss'

const ComparePage = () => {
    const categoryName = useParams().category
    let [favors, setFavors] = useState<string[]>([])
    let [category, setCategory] = useState<CategoryResponse>()
    let [proucts, setProducts] = useState<ProductResponse[]>([])
    useEffect(() => {
        (async () => {
            const favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
            setFavors(favors)
            const products = await Promise.all(favors.map(async (id) => {
                return (await ShopService.getProductById(id)).data
            }))
            setProducts(products)
            const category = (await ShopService.getCategories()).data
                .find((cat) => cat.route === categoryName)
            setCategory(category)
        })()
    })
    return (
        <div className={styles['compare-page']}>
            <div className={styles['compare-page__header']}>
                {
                    `${category?.name}: сравнение`
                }
            </div>
        </div>
    )
}

export default ComparePage