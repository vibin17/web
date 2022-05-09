import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { CategoryResponse, CategoryProp, ProductResponse } from "../../../../services/models/shop-models"
import ShopService from "../../../../services/ShopService/shop-service"
import ProductSummaryCard from "../../../ProductSummaryCard/ProductSummaryCard"
import styles from './ComparePage.module.scss'

type criteria =  {
    name: string
    importance: string
    index: number
    tiers?: boolean
    values?: string[][]
}

const ComparePage = () => {
    const categoryName = useParams().category
    let [category, setCategory] = useState<CategoryResponse>()
    let [favorProducts, setFavorProducts] = useState<ProductResponse[]>([])
    let [allCriteriasNames, setAllCriteriasNames] = useState<string[]>([])
    let [criterias, setCriterias] = useState<criteria[]>([])
    let summaryCards = useMemo(() => {
        return favorProducts.slice(0, 10).map((fav, index) => {
            return (
                <ProductSummaryCard productId={fav._id} smaller={true} key={index}/>
            )
        })
    }, [favorProducts])
    let critsPriorInputs = useMemo(() => {
        return criterias.map((crit, index) => { 
            return (
                <div className={styles['choose-section__input']} key={index}>
                    <label className={`${styles['choose-section__input-label']}`}>
                        {
                            crit.name
                        }
                    </label>
                    <select
                        className={`${styles['choose-section__field']} 
                            ${styles['choose-section__field-select']}`}
                        defaultValue={`1`}
                        onChange={(event) => {
                            const value = event.target.value
                            crit.importance = value
                        }}
                    >
                        {
                            ['1', '2', '3', '4', '5'].map((value, index) => {
                                return (
                                    <option className= {`${styles['choose-section__field']} 
                                        ${styles['choose-section__field-options']}`}
                                        value={`${value}`} key={index}
                                    >
                                        {value}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            )
        })
    }, [criterias])
    let critsValueInputs = useMemo(() => {
        return criterias.filter((crit) => crit.tiers).map((crit, index) => {
            let critValues: string[] = []
            if (crit.name === 'Производитель') {
                critValues = Array.from(new Set(favorProducts.map((fav) => {
                    return fav.manufacturer
                })))
            } else {
                critValues = Array.from(new Set(favorProducts.map((fav) => {
                    return fav.props[crit.index]
                })))
            }
            return (
                <div className={styles['choose-section']} key={index}>
                    <div className={styles['choose-section__header']}>
                        {crit.name}: выберите лучшее значение (1 - лучший, 5 - худший)
                    </div>
                    <div className={styles['choose-section__main']}>
                        {
                            critValues.map((critValue, index) => {
                                return (
                                    <div className={styles['choose-section__input']} key={index}>
                                        <label className={`${styles['choose-section__input-label']}`}>
                                            {
                                                critValue
                                            }
                                        </label>
                                        <select
                                            className={`${styles['choose-section__field']} 
                                                ${styles['choose-section__field-select']}`}
                                            defaultValue={`1`}
                                            onChange={(event) => {
                                                const value = parseInt(event.target.value)
                                                if (crit.values) {
                                                    for (let i = 0; i < 5; i++) {
                                                        let critValueIndex = crit.values[i].findIndex((crit) => crit === critValue)
                                                        if (critValueIndex >= 0) {
                                                            crit.values[i] = [...crit.values[i].slice(0, critValueIndex),
                                                                ...crit.values[i].slice(critValueIndex + 1)]
                                                        }
                                                    }
                                                    crit.values[value - 1].push(critValue)
                                                }
                                            }}
                                        >
                                            {
                                                ['1', '2', '3', '4', '5'].map((value, index) => {
                                                    return (
                                                        <option className= {`${styles['choose-section__field']} 
                                                            ${styles['choose-section__field-options']}`}
                                                            value={`${value}`} key={index}
                                                        >
                                                            {value}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    }, [criterias])
    useEffect(() => {
        (async () => {
            const favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
            const allProducts = await Promise.all(favors.map(async (id) => {
                return (await ShopService.getProductById(id)).data
            }))
            const category = (await ShopService.getCategories()).data
                .find((cat) => cat.route === categoryName)
            setCategory(category)
            const allCompareProps = category?.props.filter((prop) => prop.compareType) || []
            setAllCriteriasNames(['Цена', 'Производитель', 
                ...allCompareProps.map((prop) => prop.name)])
            const favorProducts = allProducts.filter((prod) => prod.category === category?.name)
            setFavorProducts(favorProducts)
        })()
    }, [categoryName])
    return (
        <div className={styles['compare-page']}>
            <div className={styles['compare-page__header']}>
                {
                    `${category?.name}: сравнение`
                }
            </div>
            <div className={styles['compare-page__main']}>
                <div className={styles['compare-page__summary']}>
                    {
                        summaryCards
                    }
                </div>
                <div className={styles['compare-page__form']}>
                    <div className={styles['choose-section']}>
                        <div className={styles['choose-section__header']}>
                            Выбор критериев для сравнения
                        </div>
                        <div className={styles['choose-section__main']}>
                            {
                                allCriteriasNames.map((critName, index) => { return (
                                    <div className={styles['choose-section__input']} key={index}>
                                        <input type='checkbox'
                                            className={`${styles['choose-section__field']} 
                                                ${styles['choose-section__field-checkbox']}`}
                                            name={critName}
                                            value={critName}
                                            checked={(criterias.find((crit) => crit.name === critName) && true) || false}
                                            onChange={() => {
                                                let propIndex = criterias.findIndex((crit) => crit.name === critName)
                                                if (propIndex >= 0) {
                                                    setCriterias([...criterias.slice(0, propIndex), 
                                                        ...criterias.slice(propIndex + 1)])
                                                } else {
                                                    let propIndex = category?.props.findIndex((prop) => prop.name === critName)?? -1
                                                    let newCrit: criteria = {
                                                        name: critName,
                                                        index: propIndex,
                                                        importance: '1'
                                                    } 
                                                    if (propIndex >= 0 && category?.props[propIndex].compareType === 't') {
                                                        let propValues = Array.from(new Set(favorProducts.map((fav) => {
                                                            return fav.props[propIndex]
                                                        })))
                                                        newCrit.tiers = true
                                                        newCrit.values = [propValues, [], [], [], []]
                                                    }
                                                    if (critName === 'Производитель') {
                                                        newCrit.tiers = true
                                                        let manufacturerValues = Array.from(new Set(favorProducts.map((fav) => {
                                                            return fav.manufacturer
                                                        })))
                                                        newCrit.values = [manufacturerValues, [], [], [], []]
                                                    }
                                                    setCriterias([...criterias, newCrit])                              
                                                }
                                            }}
                                        />
                                        <label className={`${styles['choose-section__input-label']}`}>
                                            {
                                                `${critName}`
                                            }
                                        </label>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
                    {criterias.length > 0 &&
                        <div className={styles['choose-section']}>
                            <div className={styles['choose-section__header']}>
                                Определите важность критериев (1 - наиболее важный, 5 - наименее)
                            </div>
                            <div className={styles['choose-section__main']}>
                                {
                                    critsPriorInputs
                                }                   
                            </div>
                        </div>
                    }
                    {
                        critsValueInputs
                    }
                    <button className={`${styles['compare-page__submit-btn']} ${criterias.length > 0 && 
                        styles['compare-page__submit-btn--active']}`} onClick={() => {
                        console.log(criterias)
                    }}>
                        Сравнить товары
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ComparePage