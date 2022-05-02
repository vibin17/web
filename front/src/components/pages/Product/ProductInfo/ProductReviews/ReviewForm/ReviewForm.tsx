import { Field, Form, Formik } from 'formik'
import { useMemo, useState } from 'react'
import ShopService from '../../../../../../services/ShopService/shop-service'
import styles from './ReviewForm.module.scss'

type props = {
    product: string
}

const ReviewForm = ({ product }: props) => {
    let [message, setMessage] = useState('')
    let rates = useMemo(() => {
        return [5, 4, 3, 2, 1].map((value, index) => {
            return (
                <option 
                    className={`${styles['form-field']} 
                        ${styles['select-category__options']}`} 
                    key={index} 
                    value={value}
                > 
                    {
                        value
                    } 
                </option>
            )
        })
    }, [])
    return (
        <div className={styles['review-form']}>
            <Formik
                initialValues={{
                    rating: '',
                    content: ''
                }}
                enableReinitialize
                onSubmit={async (values) => {
                    try {
                        const result = await ShopService.createReview({
                            product,
                            rating: values.rating,
                            reviewDate: new Date(),
                            content: values.content
                        })
                        console.log(result)
                        setMessage('Ваш отзыв отправлен. Спасибо')
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    }
                    catch (e: any) {
                        setMessage('Ошибка')
                        console.log(e)
                    }

                }}>
                <Form className={styles['review-form__main']}>
                    <div className={styles['review-form__fields-section']}>                                  
                        <div className={styles['review-form__field']}>
                            <div className={styles['review-form__field-label']}> 
                                Поставьте оценку товару 
                            </div>
                            <Field component='select'
                                id='rating'
                                name='rating'
                                className={`${styles['review-form__select']}
                                    ${styles['review-form__field-input']}`}
                                required
                            >
                                <option 
                                    className={styles['review-form__select-options']} 
                                    value={''}
                                    disabled
                                > 
                                        Выберите оценку
                                </option>
                                {
                                    rates
                                }
                            </Field>
                        </div>
                        <div className={styles['review-form__field']}>
                            <label className={styles['review-form__field-label']}>
                                Напишите ваш отзыв на товар (необязательно)
                            </label>
                            <Field 
                                component={'textarea'} 
                                className={`${styles['review-form__field-input']} 
                                    ${styles['review-form__field-input--textarea']}`}
                                type='text' 
                                id="content" 
                                name="content"
                                placeholder="Ваш отзыв"
                                rows={5}
                            />
                        </div>
                    </div>
                    <button className={styles['review-form__button']}
                            type='submit'
                    >
                        Отправить отзыв
                    </button>
                </Form>
            </Formik>
            <div className={styles['review-form__message']}>
                {
                    message
                }
            </div>
        </div>
    )
}

export default ReviewForm