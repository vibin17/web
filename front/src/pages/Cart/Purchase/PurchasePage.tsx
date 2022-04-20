import { Field, Form, Formik } from 'formik'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import ShopService from '../../../services/ShopService/shop-service'
import styles from './PurchasePage.module.scss'

const PurchasePage = () => {
    let { cartPrice } =  useTypedSelector(state => state.shopLocal)
    let func = (event: FormEvent) => {
        let value = (event.target as HTMLInputElement).value
        console.log(value)
    }
    let [isOnDeliveryPayment, setIsOnDeliveryPayment] = useState(false)
    return (
        <div className={styles['checkout']}> {
            cartPrice ? 
                <>
                    <div className={styles['checkout-header']}>
                        <div className={styles['checkout-header__label']}>
                            Оформление заказа на сумму <b> {cartPrice} ₽</b>
                        </div>
                    </div>
                    <div className={styles['checkout-form']}>
                        <Formik
                            initialValues={{
                                orderType: '',
                                deliveryAddress: '',
                                paymentType: ''
                            }}
                            enableReinitialize
                            onSubmit={async (values) => {
                                try {
                                    const result = await ShopService.createOrder()
                                    console.log(values)
                                    console.log(isOnDeliveryPayment)
                                }
                                catch (e: any) {
                                    console.log(e)                                 
                                }

                            }}>
                            <Form className={styles['form__main']}>
                                <div className={styles['form__fields-section']}>
                                    <div className={styles['form-field']}>
                                        <label className={styles['form-field__label']}>
                                            Название продукта
                                        </label>
                                        <Field 
                                            className={styles['form-field__input']}
                                            type='text' 
                                            id="deliveryAddress" 
                                            name="deliveryAddress"
                                            placeholder="Адрес доставки" 
                                            required
                                        />
                                    </div>

                                    <div className={styles['form-field']}>
                                        <label className={styles['form-field__label']}>
                                            Способ получения товара
                                        </label>
                                        <div className={styles['form-radio']}>
                                            <label className={styles['form-radio__label']}>
                                                <Field 
                                                    className={styles['form-radio__input']} 
                                                    type="radio" name="orderType" value="DELIVERY"
                                                />
                                                Доставка
                                            </label>
                                            <label className={styles['form-radio__label']}>
                                                <Field 
                                                    className={styles['form-radio__input']} 
                                                    type="radio" name="orderType" value="PICKUP" 
                                                />
                                                Самовывоз
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className={styles['form-field']}>
                                        <label className={styles['form-field__label']}>
                                            Способ оплаты
                                        </label>
                                        <div className={styles['form-radio']}>
                                            <label className={styles['form-radio__label']}>
                                                <Field 
                                                    className={styles['form-radio__input']} 
                                                    type="radio" name="paymentType" value="ONLINE"
                                                    onClick={() => {
                                                        setIsOnDeliveryPayment(false)
                                                    }}
                                                />
                                                Онлайн
                                            </label>
                                            <label className={styles['form-radio__label']}>
                                                <Field 
                                                    className={styles['form-radio__input']} 
                                                    type="radio" name="paymentType" value="ON_DELIVERY"
                                                    onClick={() => {
                                                        setIsOnDeliveryPayment(true)
                                                    }}
                                                />
                                                При получении
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button className={styles['form-button']}
                                        type='submit'
                                >{!isOnDeliveryPayment?
                                    'Оплатить и оформить заказ'
                                    :
                                    'Оформить заказ'
                                }
                                </button>
                            </Form>
                        </Formik>
                    </div>
                    <div className={styles['checkout-footer']}>
                        {/* <button className={styles['checkout-footer__button']}
                        onClick={() => {

                        }}>
                            Оформить заказ
                        </button> */}
                    </div>
                </>
                :
                <div className={styles['checkout-header']}>
                    <div className={styles['checkout-header__label']}>
                        В корзине пусто
                    </div>
                </div>

            }  
        </div>
    )
}

export default PurchasePage