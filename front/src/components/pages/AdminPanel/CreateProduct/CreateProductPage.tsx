import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { FileWithPath } from "react-dropzone"
import { CategoryResponse } from "../../../../services/models/shop-models"
import ShopService from "../../../../services/ShopService/shop-service"
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


const CreateProductPage = () => {
    let [categories, setCategories] = useState<CategoryResponse[]>([])
    let [selectedCategory, setCategory] = useState<CategoryResponse>()
    let [inactive, setInactive] = useState(false)
    let [message, setMessage] = useState('')
    let [propsInitValues, setPropsInitValues] = useState<string[]>([])
    const [files, setFiles] = useState<FileWithPath[]>([])
    useEffect(() => {
        (async () => {
            const categories = (await ShopService.getCategories()).data
            setCategories(categories)
        })()
    }, [])
    return (
        <div className={styles['admin-panel']}>
            <div className={styles['admin-panel__header']}>
                Добавление товара
            </div>
            <div className={`${styles['create-form']} ${inactive && styles['create-form--inactive']}`}>
                <div className={styles['form-field']}>
                    <div className={styles['form-field__label']}> Выберите категорию товара </div>
                    <select className={styles['select-category']} 
                        defaultValue={'default'}
                        onChange={
                            async (e) => {
                                let selectedCategory = categories[e.target.selectedIndex - 1]
                                setCategory(selectedCategory)
                                let propsInitValues: string[] = []
                                let categoryProps = selectedCategory.props
                                for (let i = 0; i < categoryProps.length; i++) {
                                    propsInitValues.push('')
                                }
                                setPropsInitValues(propsInitValues)
                            }
                        }>
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
                    <Formik
                        initialValues={{
                            productName: '',
                            manufacturer: '',
                            releaseYear: '',
                            price: '',
                            productDescription: '',
                            props: propsInitValues
                        }}
                        enableReinitialize
                        onSubmit={async (values) => {
                            try {
                                const result = await ShopService.createProduct({
                                    productName: values.productName,
                                    manufacturer: values.manufacturer,
                                    description: values.productDescription,
                                    price: values.price,
                                    releaseYear: values.releaseYear,
                                    category: selectedCategory?.name || 'error',
                                    props: values.props
                                }, files)
                                setMessage(`Товар добавлен с id ${result.data._id}`)
                                setInactive(true)
                            }
                            catch (e: any) {
                                console.log(e)
                                setMessage(e.response.data.message)
                            }

                        }}>
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
                                <button className={styles['form-button']} type="submit">Выложить товар</button>
                            </div>
                        </Form>
                    </Formik>
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

export default CreateProductPage