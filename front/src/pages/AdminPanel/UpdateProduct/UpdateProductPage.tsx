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


const UpdateProductPage = () => {
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
        <div className={styles['admin-panel']}>
            <div className={`${styles['create-form']} ${inactive && styles['create-form--inactive']}`}>
                <div className={styles['form-field']}>
                    <div className={styles['form-field__label']}> Выберите категорию товара </div>
                    <select className={styles['select-category']} 
                        defaultValue={'default'}
                        onChange={
                            async (e) => {
                                let selectedCategory = categories[e.target.selectedIndex - 1]
                                let productsOfCategory = (await ShopService.getAllProductsOfCategory(selectedCategory.name)).data
                                console.log(productsOfCategory)
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
                                            productDescription: product.description,
                                            props: product.props
                                        }
                                        setInitialValues(initialValues)
                                        try {
                                            let files = []
                                            for (let filePath of product.imagePaths) {
                                                let imageData = (await ShopService.getProductImage(filePath)).data
                                                files.push(new File([imageData], filePath))
                                            }
                                            setFiles(files)
                                        } catch {
                                            setFiles([])
                                        }
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
                                    console.log(values)
                                    try {
                                        const result = await ShopService.updateProduct({
                                            id: selectedProduct?._id || 'error',
                                            productName: values.productName,
                                            manufacturer: values.manufacturer,
                                            description: values.productDescription,
                                            price: values.price,
                                            releaseYear: values.releaseYear,
                                            category: selectedCategory?.name || 'error',
                                            props: values.props
                                        }, files)
                                        setMessage(`Обновлен товар с id ${selectedProduct?._id}`)
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
                                                required
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
                                                required
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
                                                required
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
                                                required
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
                                                required
                                            />
                                        </div>

                                        {selectedCategory?.props.map((prop, index) => {
                                            return (
                                                <div className={styles['form-field']} key={index}>
                                                    <div className={styles['form-field__label']}>
                                                        {prop.name}
                                                    </div>
                                                    <Field 
                                                        className={styles['form-field__input']}
                                                        type='text' 
                                                        id={`props[${index}]`} 
                                                        name={`props[${index}]`}
                                                        placeholder={prop.name}
                                                        required
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className={styles['form__upload-section']}>
                                        <Dropzone files={files} setFiles={setFiles}/>
                                    </div>
                                    <div className={styles['form__submit-section']}>
                                        <button className={styles['form-button']} type="submit">Обновить товар</button>
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
        </div>
    )
}

export default UpdateProductPage