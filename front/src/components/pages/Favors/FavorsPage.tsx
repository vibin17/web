import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryResponse, ProductResponse } from '../../../services/models/shop-models'
import ShopService from '../../../services/ShopService/shop-service'
import ProductObjectListCard from '../../ProductListCard/ProductObjectListCard'
import styles from './FavorsPage.module.scss'

const FavorsPage = () => {
    let [favors, setFavors] = useState<string[]>([])
    let [products, setProducts] = useState<ProductResponse[]>([])
    let [favorCategories, setFavorCategories] = useState<CategoryResponse[]>([])
    let categoryFavorsCard = useMemo(() => {
        return favorCategories.map((cat, index) => {
            return (
                <div className={styles['fav-card']} key={index}>
                    <div className={styles['fav-card__header']}>
                        {
                            cat.name
                        }
                        <div className={styles['fav-card__header-aside']}>
                            <div className={styles['fav-card__clear']}>
                                Очистить
                            </div>
                            <Link to={`compare/${cat.route}`} className={styles['fav-card__link']}>
                                Сравнить товары категории
                            </Link>
                        </div>
                    </div>
                    <div className={styles['fav-card__main']}>
                        {
                            products.filter((prod) => prod.category == cat.name).map((prod, index) => {
                                return <ProductObjectListCard product={prod} cardKey={index} 
                                    favored={favors.includes(prod._id)} key={index}
                                />
                            })
                        }
                    </div>
                </div>
            )
        })
    }, [products, favorCategories])

    useEffect(() => {
        (async () => {
            const favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
            setFavors(favors)
            const products = await Promise.all(favors.map(async (id) => {
                return (await ShopService.getProductById(id)).data
            }))
            setProducts(products)
            let favorCategoriesNames = Array.from(new Set(products.map((product) => {
                return product.category
            })))
            const allCategories = (await ShopService.getCategories()).data
            let favorCategories = allCategories.filter((c) => favorCategoriesNames.includes(c.name))
            setFavorCategories(favorCategories)
        })()
    }, [])
    return (
        <div className={styles['favors-page']}>
            <div className={styles['favors-page__header']}>
                Избранные товары
            </div>
            <div className={styles['favors-page__main']}>
                {
                    categoryFavorsCard
                }
            </div>
        </div>
    )
}

export default FavorsPage