import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryResponse } from '../../../services/models/shop-models'
import ShopService from '../../../services/ShopService/shop-service'
import styles from './CatalogueMenu.module.scss'

type props = {
    isMenuActive: boolean
    setMenuActive: (value: boolean) => void
}

const CatalogueMenu = ({ isMenuActive, setMenuActive }: props) => {
    let [categories, setCategories] = useState<CategoryResponse[]>([])
    let categoryItems = useMemo(() => {
        return categories.map((category, index) => {
            return (
                <li className={styles['menu-list__item']} key={index}>
                    {
                        <Link className={styles['link']} to={`/catalogue/${category.route}`}
                            onClick={() => {
                                setMenuActive(false)
                            }}>
                            {
                                category.name
                            }
                        </Link>
                    }
                </li>
            )
        })
    }, [categories])
    useEffect(() => {
        (async () => {
            const categories = (await ShopService.getCategories()).data
            setCategories(categories)
        })()
    }, [])
    return (
        <div className={`${styles['catalogue-menu']} ${isMenuActive && styles['catalogue-menu--active']}`}>
            <ul className={styles['menu-list']}>
                {
                    categoryItems
                }
            </ul>
        </div>
    )
}

export default CatalogueMenu