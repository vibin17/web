import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { FileWithPath } from "react-dropzone"
import { CategoryResponseDto, ProductIdResponse } from "../../../services/models/shop-models"
import ShopService from "../../../services/ShopService/shop-service"
import Dropzone from "../Dropzone/Dropzone"
import styles from '../CreateProductPage.module.scss'

export type ProductData = {
    readonly productName: string
    readonly manufacturer: string
    readonly releaseYear: string
    readonly price: string
    readonly productDescription: string
    readonly props: string[]
}


const DeleteProductPage = () => {
    let [categories, setCategories] = useState<CategoryResponseDto[]>([])
    let [productsOfCategory, setProductsOfCategory] = useState<ProductIdResponse[]>([])
    let [selectedCategory, setCategory] = useState<CategoryResponseDto>()
    let [selectedProduct, setProduct] = useState<ProductIdResponse>()
    let [inactive, setInactive] = useState(false)
    let [message, setMessage] = useState('')
    let [initialValues, setInitialValues] = useState<ProductData>({
        productName: '',
        manufacturer: '',
        releaseYear: '',
        price: '',
        productDescription: '',
        props: []
    })
    const [files, setFiles] = useState<FileWithPath[]>([])
    useEffect(() => {
        (async () => {
            const categories = (await ShopService.getCategories()).data
            setCategories(categories)
        })()
    }, [])
    return (
        <div className={`${styles['create-form']} ${inactive && styles['create-form--inactive']}`}>
            <div className={styles['form-field']}>
                <div className={styles['form-field__label']}> Выберите категорию товара </div>
                <select className={styles['select-category']} 
                    defaultValue={'default'}
                    onChange={
                        async (e) => {
                            let selectedCategory = categories[e.target.selectedIndex - 1]
                            let productsOfCategory = (await ShopService.getAllProductsOfCategory(selectedCategory.name)).data
                            setProductsOfCategory(productsOfCategory)
                            setCategory(selectedCategory)
                            let initialValues: ProductData = {
                                productName: '',
                                manufacturer: '',
                                releaseYear: '',
                                price: '',
                                productDescription: '',
                                props: []
                            }
                            let categoryProps = selectedCategory.props
                            for (let i = 0; i < categoryProps.length; i++) {
                                initialValues.props.push('')
                            }
                            setInitialValues(initialValues)
                        }
                    }
                >
                    <option 
                        className={styles['select-category__options']} 
                        value={'default'} 
                        disabled> 
                            Выберите категорию товаров 
                    </option>

                    {categories.map((category, index) => {
                            return (
                                <option 
                                    className={`${styles['form-field']} ${styles['select-category__options']}`} 
                                    key={index} 
                                    value={category.name}> {
                                        category.name
                                    } 
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            {selectedCategory && 
                <>   
                    <div className={styles['form-field']}>
                        <div className={styles['form-field__label']}> Выберите категорию товара </div>
                        <select className={styles['select-category']} 
                            defaultValue={'default'}
                            onChange={
                                async (e) => {
                                    let selectedProduct = productsOfCategory[e.target.selectedIndex - 1]
                                    setProduct(selectedProduct)
                                    let product = (await ShopService.getProductById(selectedProduct._id)).data
                                    let initialValues: ProductData = {
                                        productName: product.productName,
                                        manufacturer: product.manufacturer,
                                        releaseYear: product.releaseYear,
                                        price: product.price,
                                        productDescription: product.price,
                                        props: product.props
                                    }
                                    let files = []
                                    for (let filePath of product.imagePaths) {
                                        let imageData = (await ShopService.getProductImage(filePath)).data
                                        files.push(new File([imageData], filePath))
                                    }
                                    setInitialValues(initialValues)
                                    setFiles(files)
                                }

                            }>
                            <option 
                                className={styles['select-category__options']} 
                                value={'default'} 
                                disabled> 
                                    Выберите товар
                                </option>

                            {productsOfCategory.map((product, index) => {
                                    return (
                                        <option 
                                            className={`${styles['form-field']} ${styles['select-category__options']}`} 
                                            key={index} 
                                            value={product.productName}> {
                                                product.productName
                                            } 
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {selectedProduct && 
                        <Formik
                            initialValues={{...initialValues}}
                            onSubmit={async (values) => {
                                try {
                                    const result = await ShopService.deleteProduct(selectedProduct?._id || 'error')
                                    console.log(result)
                                    setMessage(`Удален товар с id ${selectedProduct?._id}`)
                                    setInactive(true)
                                }
                                catch (e: any) {
                                    console.log(e)
                                    setMessage(e.response.data.message)
                                }

                            }}
                            enableReinitialize
                        >
                            <Form className={styles['form__main']}>
                                <div className={styles['form__fields-section']}>
                                    <div className={styles['form-field']}>
                                        <div className={styles['form-field__label']}>
                                            Название продукта
                                        </div>
                                        <Field 
                                            className={styles['form-field__input']}
                                            type='text' 
                                            id="productName" 
                                            name="productName"
                                            placeholder="Название продукта" 
                                            disabled
                                        />
                                    </div>
                                    <div className={styles['form-field']}>
                                        <div className={styles['form-field__label']}>
                                            Производитель
                                        </div>
                                        <Field 
                                            className={styles['form-field__input']}
                                            type='text' 
                                            id="manufacturer" 
                                            name="manufacturer"
                                            placeholder="Производитель" 
                                            disabled
                                        />
                                    </div>
                                    <div className={styles['form-field']}>
                                        <div className={styles['form-field__label']}>
                                            Год выпуска
                                        </div>
                                        <Field 
                                            className={styles['form-field__input']}
                                            type='text' 
                                            id="releaseYear" 
                                            name="releaseYear" 
                                            placeholder="Год выпуска" 
                                            disabled
                                        />
                                    </div>
                                    <div className={styles['form-field']}>
                                        <div className={styles['form-field__label']}>
                                            Цена
                                        </div>
                                        <Field 
                                            className={styles['form-field__input']}
                                            type='text' 
                                            id="price" 
                                            name="price" 
                                            placeholder="Цена"
                                            disabled
                                        />
                                    </div>
                                    <div className={styles['form-field']}>
                                        <div className={styles['form-field__label']}>
                                            Описание товара
                                        </div>
                                        <Field 
                                            component={'textarea'} 
                                            className={`${styles['form-field__input']} ${styles['form-field__input--textarea']}`}
                                            id="productDescription" 
                                            name="productDescription" 
                                            placeholder="Описание товара"
                                            rows={5}
                                            disabled
                                        />
                                    </div>

                                    {selectedCategory?.props.map((prop, index) => {
                                        return (
                                            <div className={styles['form-field']} key={index}>
                                                <div className={styles['form-field__label']}>
                                                    {prop}
                                                </div>
                                                <Field 
                                                    className={styles['form-field__input']}
                                                    type='text' 
                                                    id={`props[${index}]`} 
                                                    name={`props[${index}]`}
                                                    placeholder={prop}
                                                    disabled
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={styles['form__upload-section']}>
                                    <Dropzone files={files} setFiles={setFiles} disabled/>
                                </div>
                                <div className={styles['form__submit-section']}>
                                    <button className={styles['form-button']} type="submit">Удалить товар</button>
                                </div>
                            </Form>
                        </Formik>
                    }
                </>
            }
            {message && 
                <div className={styles['form-message']}> {
                    message
                }</div>
            }
        </div>
    )
}

export default DeleteProductPage