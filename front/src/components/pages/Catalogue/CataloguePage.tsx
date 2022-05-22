import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { CategoryResponse, CategoryProp, ProductIdResponse, ProductResponse } from "../../../services/models/shop-models"
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
    const itemsOnPage = 8
    // let [productIds, setProductIds] = useState<ProductIdResponse[]>([])
    let [products, setProducts] = useState<ProductResponse[]>([])
    let [category, setCategory] = useState<CategoryResponse>()
    let [activePage, setActivePage] = useState(1)
    let [totalPages, setTotalPages] = useState(0)
    let [ascendingSort, setAscendingSort] = useState(true)
    let [propFilters, setPropFilters] = useState<propsFilter[]>([])
    let [manufacturerFilters, setManufacturerFilters] = useState<string[]>([])
    let favors = useMemo(() => {
        return JSON.parse(localStorage.getItem('favors')?? '[]')
    }, [])
    let sortedProducts = useMemo(() => {
        let filteredProducts = products.filter((product) => {
            if (manufacturerFilters.length > 0) {
                if (!manufacturerFilters.includes(product.manufacturer)) {
                    return false
                }
            }
            for (let filter of propFilters) {
                if (filter.values.length > 0) {
                    if (!filter.values.includes(product.props[filter.index])) {
                        return false
                    }
                }
            }
            return true
        })
        let sortedProducts = filteredProducts.sort((a, b) => (ascendingSort? 1 : -1) * (parseInt(a.price) - parseInt(b.price)))
        setTotalPages(Math.ceil(sortedProducts.length / itemsOnPage))
        setActivePage(1)
        return sortedProducts
    }, [products, ascendingSort, propFilters, manufacturerFilters])
    let productCards = useMemo(() => {
        window.scrollTo(0, 0)
        return sortedProducts.filter((product, index) => 
            index >= (activePage - 1) * itemsOnPage && index < activePage * itemsOnPage
        ).map((product, index) => {
            return <ProductObjectListCard product={product}
                cardKey={index} key={index} favored={favors.includes(product._id)}/>
        })
    }, [sortedProducts, activePage])
    let filterProps = useMemo(() => {
        return category?.props.map((prop, index) => { 
            return { prop, index }}).filter((prop) => prop.prop.filter)
    }, [category])
    let manufacturersValues = useMemo(() => {
        return Array.from(new Set(products.map((product) => {
            return product.manufacturer
        })))
    }, [products])
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
            const products = await Promise.all(productIds.map(async (id) => {
                return (await ShopService.getProductById(id._id)).data
            }))
            setTotalPages(Math.ceil(products.length / itemsOnPage))
            setProducts(products)
        })()
    }, [categoryRoute])

    return (
        <div className={styles['catalogue']}> 
            <div className={styles['catalogue__header']}>
                <div className={styles['catalogue__header-label']}>
                    {
                        category?.name
                    }
                </div>
            </div>
            <div className={styles['catalogue__main']}>
                <aside className={styles['catalogue__sort']}>
                    <div className={styles['catalogue__sort-menu']}>
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
                            <div className={styles['catalogue__filter']}>
                                <div className={styles['catalogue__filter-name']}>
                                    Производитель
                                </div> 
                                <div className={styles['catalogue__filter-props']}>
                                    {
                                        manufacturersValues.map((value, index) => {
                                            return (
                                                <div className={styles['catalogue__filter-input']}
                                                    key={index}
                                                >
                                                    <input type='checkbox'
                                                        className={styles['catalogue__filter-input-checkbox']}
                                                        name={`Производитель`}
                                                        value={value}
                                                        checked={(manufacturerFilters.find((filter) => filter === value) && true) || false}
                                                        onChange={() => {
                                                            let manufacturerIndex = manufacturerFilters.findIndex((manufacturer) => manufacturer === value)
                                                            if (manufacturerIndex >= 0) {
                                                                setManufacturerFilters([
                                                                    ...manufacturerFilters.slice(0, manufacturerIndex),
                                                                    ...manufacturerFilters.slice(manufacturerIndex + 1)
                                                                ])
                                                            } else {
                                                                setManufacturerFilters([
                                                                    ...manufacturerFilters,
                                                                    value
                                                                ])
                                                            }
                                                            console.log(manufacturerFilters)
                                                        }}
                                                    >
                                                    </input>
                                                    <label className={styles['catalogue__filter-input-label']}>
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
                                                                <div className={styles['catalogue__filter-input']}
                                                                    key={index}
                                                                >
                                                                    <input type='checkbox'
                                                                        className={styles['catalogue__filter-input-checkbox']}
                                                                        name={`${filterProp.prop.name}`}
                                                                        value={value}
                                                                        checked={propFilters.find((filter) => filter.index === filterProp.index)?.values.includes(value) || false}
                                                                        onChange={() => {
                                                                            let filter = propFilters.find((filter) => filter.index === filterProp.index)
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
                                                                            let filterIndex = propFilters.findIndex((filter) => filter.index === filterProp.index)
                                                                            if (filterIndex >= 0) {
                                                                                setPropFilters([...propFilters.slice(0, filterIndex),
                                                                                    filter,
                                                                                    ...propFilters.slice(filterIndex + 1)])
                                                                            } else {
                                                                                setPropFilters([...propFilters, filter])
                                                                            }
                                                                        }}
                                                                    >
                                                                    </input>
                                                                    <label className={styles['catalogue__filter-input-label']}>
                                                                        {
                                                                            value
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className={styles['catalogue__filter-input']}
                                                                    key={index}
                                                                >
                                                                    <input type='radio'
                                                                        className={styles['catalogue__filter-input-radio']}
                                                                        name={`${filterProp.prop.name}`}
                                                                        value={value}
                                                                        checked={propFilters.find((filter) => filter.index === filterProp.index)?.values.includes(value) || false}
                                                                        onChange={() => {
                                                                            let filter = {
                                                                                index: filterProp.index,
                                                                                values: [value]
                                                                            }
                                                                            let filterIndex = propFilters.findIndex((filter) => filter.index === filterProp.index)
                                                                            setPropFilters([...propFilters.slice(0, filterIndex),
                                                                                filter,
                                                                                ...propFilters.slice(filterIndex + 1)])
                                                                        }}
                                                                    >
                                                                    </input>
                                                                    <label className={styles['catalogue__filter-input-label']}>
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
                        <button className={styles['catalogue__filters-reset-btn']} 
                            onClick={() => {
                                setManufacturerFilters([])
                                setPropFilters([])
                            }}
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                </aside>
                
                <div className={styles['catalogue__product-cards']}>
                    {
                        productCards
                    }
                </div>
            </div>
            <div className={styles['catalogue__footer']}>
                <div className={styles['catalogue__pages']}>
                    {
                        [...Array(totalPages)].map((x, index) => {
                            return (
                                <button 
                                    className={`${styles['catalogue__pages-btn']} ${
                                        activePage === index + 1 && styles['catalogue__pages-btn--active']}`} 
                                    onClick={() => {
                                        setActivePage(index + 1)
                                    }}
                                    key={index}
                                >
                                    {index + 1}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CataloguePage