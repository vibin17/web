import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { CategoryResponse, CateogryProp, ProductIdResponse, ProductResponse } from "../../../services/models/shop-models"
import ShopService from "../../../services/ShopService/shop-service"
import ProductObjectListCard from "../../ProductListCard/ProductObjectListCard"
import styles from './CataloguePage.module.scss'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

type propsFilter = {
    index: number
    values: string[]
}

const CataloguePage = () => {
    const categoryRoute = useParams().categoryRoute
    // let [productIds, setProductIds] = useState<ProductIdResponse[]>([])
    let [products, setProducts] = useState<ProductResponse[]>([])
    let [category, setCategory] = useState<CategoryResponse>()
    let [ascendingSort, setAscendingSort] = useState(true)
    let [filters, setFilters] = useState<propsFilter[]>([])
    let favors = useMemo(() => {
        return JSON.parse(localStorage.getItem('favors')?? '[]')
    }, [])
    let productCards = useMemo(() => {
        let filteredProducts = products.filter((product) => {
            for (let filter of filters) {
                if (filter.values.length > 0) {
                    if (!filter.values.includes(product.props[filter.index])) {
                        return false
                    }
                }
            }
            return true
        })
        let sortedProducts = filteredProducts.sort((a, b) => (ascendingSort? 1 : -1) * (parseInt(a.price) - parseInt(b.price)))
        console.log(sortedProducts)
        return sortedProducts.map((product, index) => {
            return <ProductObjectListCard product={product}
                cardKey={index} key={index} favored={favors.includes(product._id)}/>
        })
    }, [products, ascendingSort, filters])
    let filterProps = useMemo(() => {
        return category?.props.map((prop, index) => { 
            return { prop, index }}).filter((prop) => prop.prop.filter)
    }, [category])
    let propNoRepeatValues = useMemo(() => {
        const propNoRepeatValues: string[][] = []
        filterProps?.forEach((prop) => {
            let allValuesForProp = products.map((product) => { 
                return product.props[prop.index]
            })
            propNoRepeatValues.push(Array.from(new Set(allValuesForProp)))
        })
        return propNoRepeatValues
    }, [filterProps, products])
    useEffect(() => {
        (async () => {
            const category = (await ShopService.getCategories()).data.find((category) => {
                return category.route === categoryRoute
            })
            setCategory(category)
            const productIds = (await ShopService.getAllProductsOfCategory(category?.name|| 'error')).data       
            // setProductIds(productIds)
            const productsPromises = productIds.map(async (id) => {
                return (await ShopService.getProductById(id._id)).data
            })
            const products = await Promise.all(productsPromises)
            setProducts(products)
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
                <aside className={styles['catalogue__sort-menu']}>
                    <button className={styles['catalogue__sort-btn']}
                        onClick={() => {setAscendingSort(!ascendingSort)}}
                    >
                        Сортировать по цене
                        {ascendingSort?
                            <AiOutlineArrowDown className={styles['catalogue__arrow']}/>
                            :
                            <AiOutlineArrowUp className={styles['catalogue__arrow']}/>
                        }
                    </button>
                    <div className={styles['catalogue__filters']}>
                        {
                            filterProps?.map((filterProp, index) => {
                                return (
                                    <div className={styles['catalogue__filter']} key={index}>
                                        <div className={styles['catalogue__filter-name']}>
                                            {
                                                filterProp.prop.name
                                            }
                                        </div> 
                                        <div className={styles['catalogue__filter-props']}>
                                            {
                                                propNoRepeatValues[index].map((value, index) => {
                                                    return !filterProp.prop.bool?
                                                        (
                                                            <div className={styles['catalogue__filter-checkbox']}
                                                                key={index}
                                                            >
                                                                <input type='checkbox'
                                                                    className={styles['catalogue__filter-checkbox-input']}
                                                                    onClick={() => {
                                                                        let filter = filters.find((filter) => filter.index === filterProp.index)
                                                                        if (filter) {
                                                                            let valueIndex = filter.values.findIndex((val) => val === value)
                                                                            if (valueIndex >= 0) {
                                                                                filter.values = [...filter.values.slice(0, valueIndex), 
                                                                                ...filter.values.slice(valueIndex + 1)]
                                                                            } else {
                                                                                filter.values.push(value)
                                                                            }
                                                                        } else {
                                                                            filter = {
                                                                                index: filterProp.index,
                                                                                values: [value]
                                                                            }
                                                                        }
                                                                        let filterIndex = filters.findIndex((filter) => filter.index === filterProp.index)
                                                                        if (filterIndex >= 0) {
                                                                            setFilters([...filters.slice(0, filterIndex),
                                                                                filter,
                                                                                ...filters.slice(filterIndex + 1)])
                                                                        } else {
                                                                            setFilters([...filters, filter])
                                                                        }
                                                                    }}
                                                                >
                                                                </input>
                                                                <label className={styles['catalogue__filter-checkbox-label']}>
                                                                    {
                                                                        value
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div className={styles['catalogue__filter-checkbox']}
                                                                key={index}
                                                            >
                                                                <input type='radio'
                                                                    className={styles['catalogue__filter-checkbox-input']}
                                                                    name={`${filterProp.prop.name}`}
                                                                    onClick={() => {
                                                                        let filter = {
                                                                            index: filterProp.index,
                                                                            values: [value]
                                                                        }
                                                                        let filterIndex = filters.findIndex((filter) => filter.index === filterProp.index)
                                                                        setFilters([...filters.slice(0, filterIndex),
                                                                            filter,
                                                                            ...filters.slice(filterIndex + 1)])
                                                                    }}
                                                                >
                                                                </input>
                                                                <label className={styles['catalogue__filter-checkbox-label']}>
                                                                    {
                                                                        value
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={() => {
                        console.log(filters)
                    }}>btn</button>
                </aside>
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