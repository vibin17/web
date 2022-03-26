import { Field, Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { FileWithPath } from "react-dropzone"
import { CategoryResponseDto } from "../../../services/response/shop-models"
import ShopService from "../../../services/ShopService/shop-service"
import Dropzone from "../Dropzone/Dropzone"
import styles from './CreateProductPage.module.scss'

const CreateProductPage = () => {
    let [categories, setCategories] = useState<CategoryResponseDto[]>([])
    let [selectedCategory, setCategory] = useState<CategoryResponseDto>()
    let [initialValues, setInitialValues] = useState<Object>()
    const [files, setFiles] = useState<FileWithPath[]>([])
    useEffect(() => {
        (async () => {
            const categories = (await ShopService.getCategories()).data
            setCategories(categories)
        })()
    }, [])
    return (
        <div className='create-form'>
            <select name='select-category' 
                defaultValue={'default'}
                onChange={
                    async (e) => {
                        setCategory(categories[e.target.selectedIndex - 1])
                        let initialValues: any = {
                            productName: '',
                            releaseYear: '',
                            price: ''
                        }
                        let categoryProps = categories[e.target.selectedIndex - 1].props
                        for (let i = 0; i < categoryProps.length; i++) {
                            initialValues[`prop${i + 1}`] = ''
                        }
                        setInitialValues(initialValues)
                        console.log(initialValues)
                    }

                }>
                <option value={'default'} disabled> Выберите категорию товаров </option>

                {categories.map((category, index) => {
                        return (
                            <option key={index} value={category.name}> {
                                category.name
                            } 
                            </option>
                        )
                    })
                }
            </select>
            {selectedCategory && 
                <Formik
                    initialValues={{...initialValues}}
                    onSubmit={async (values) => {
                        console.log(values)

                    }}
                    enableReinitialize>
                    <Form className={styles['form__main']}>
                            <Field 
                                className={styles['form-field__input']}
                                type='text' 
                                id="productName" 
                                name="productName"
                                placeholder="Название продукта" 
                                required
                            />
                            <Field 
                                className={styles['form-field__input']}
                                type='text' 
                                id="releaseYear" 
                                name="releaseYear" 
                                placeholder="Год выпуска" 
                                required
                            />
                            <Field 
                                className={styles['form-field__input']}
                                type='text' 
                                id="price" 
                                name="price" 
                                placeholder="Цена" 
                                required
                            />
                            {selectedCategory?.props.map((prop, index) => {
                                return (
                                    <Field 
                                        className={styles['form-field__input']}
                                        key={index}
                                        type='text' 
                                        id={`prop${index + 1}`} 
                                        name={`prop${index + 1}`}
                                        placeholder={prop}
                                        required
                                    />
                                )
                            })}
                            <Dropzone files={files} setFiles={setFiles}/>

                            <button className={styles['form-button']} type="submit">Выложить товар</button>
                    </Form>
                </Formik>
            }
        </div>
    )
}

export default CreateProductPage