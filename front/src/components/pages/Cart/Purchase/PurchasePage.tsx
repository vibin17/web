import { Field, Form, Formik } from 'formik'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShopLocalActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { ProductResponse, ShopResponse } from '../../../../services/models/shop-models'
import ShopService from '../../../../services/ShopService/shop-service'
import ProductSummaryCard from '../../../ProductSummaryCard/ProductSummaryCard'
import styles from './PurchasePage.module.scss'

const PurchasePage = () => {
    let { cartPrice } =  useTypedSelector(state => state.shopLocal)
    let [isPickup, setIsPickup] = useState(false)
    let [isOnDeliveryPayment, setIsOnDeliveryPayment] = useState(false)
    let [shops, setShops] = useState<ShopResponse[]>([])
    let [message, setMessage] = useState('')
    let [price, setPrice] = useState(0)
    let [products, setProducts] = useState<ProductResponse[]>([])
    let { clearCart } = useShopLocalActions()
    let navigate = useNavigate()
    let productCards = useMemo((() => {
        return products.map((prod, index) => {
            return (
                <ProductSummaryCard productId={prod._id} key={index} smaller/>
            )
        })
    }), [products])
    useEffect(() => {
        (async () => {
            const cart: string[] = JSON.parse(localStorage.getItem('cart')?? '[]')
            const productsToBuy = await Promise.all(cart.map(async (id) => {
                return (await ShopService.getProductById(id)).data
            }))
            setProducts(productsToBuy)
            setPrice(productsToBuy.map((prod) => prod.price).reduce((prev, cur) => prev + parseInt(cur), 0))
            const shops = (await ShopService.getShops()).data
            setShops(shops)
        })()
    }, [])
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
                                orderType: 'DELIVERY',
                                deliveryAddress: '',
                                shopAddress: '',
                                paymentType: 'ONLINE'
                            }}
                            enableReinitialize
                            onSubmit={async (values) => {
                                try {
                                    if (!isOnDeliveryPayment) {
                                        setMessage('Оплата...')
                                        const result = await ShopService.createOrder({
                                            orderType: values.orderType,
                                            orderDate: new Date(),
                                            deliveryAddress: (!isPickup?
                                                values.deliveryAddress
                                                :
                                                values.shopAddress),
                                            paymentType: values.paymentType
                                        })
                                        setTimeout(async () => {
                                            setMessage(`Ваш заказ сформирован с номером ${result.data._id}. Переход на страницу заказов...`)
                                        }, 1500)
                                        setTimeout(() => {
                                            clearCart()
                                            navigate('/orders')
                                        }, 2500)
                                        
                                    } else {
                                        const result = await ShopService.createOrder({
                                            orderType: values.orderType,
                                            orderDate: new Date(),
                                            deliveryAddress: (!isPickup?
                                                values.deliveryAddress
                                                :
                                                values.shopAddress),
                                            paymentType: values.paymentType
                                        })
                                        setMessage(`Ваш заказ сформирован с номером ${result.data._id}. Переход на главную страницу...`)
                                        setTimeout(() => {
                                            clearCart()
                                            navigate('/orders')
                                        }, 2500)
                                    }
                                }
                                catch (e: any) {
                                    setMessage(e)                               
                                }

                            }}>
                            <Form className={styles['form__main']}>
                                <div className={styles['form__fields-section']}>                                  
                                    <div className={styles['form-field']}>
                                        <label className={styles['form-field__label']}>
                                            Способ получения товара
                                        </label>
                                        <div className={styles['form-radio']}>
                                            <label className={styles['form-radio__label']}>
                                                <Field 
                                                    className={styles['form-radio__input']} 
                                                    type="radio" name="orderType" value="DELIVERY"
                                                    required
                                                    checked={!isPickup}
                                                    onClick={() => {
                                                        setIsPickup(false)
                                                    }}

                                                />
                                                Доставка
                                            </label>
                                            <label className={styles['form-radio__label']}>
                                                <Field 
                                                    className={styles['form-radio__input']} 
                                                    type="radio" name="orderType" value="PICKUP"
                                                    checked={isPickup}
                                                    onClick={() => {
                                                        setIsPickup(true)
                                                    }}
                                                />
                                                Самовывоз
                                            </label>
                                        </div>
                                    </div>
                                    {isPickup?
                                        <div className={styles['form-field']}>
                                            <div className={styles['form-field__label']}> Выберите магазин </div>
                                            <Field component='select'
                                                id='shopAddress'
                                                name='shopAddress'
                                                className={styles['form-select-field']}
                                                required
                                            >
                                                <option 
                                                    className={styles['form-select-options']} 
                                                    value={''}
                                                    disabled
                                                > 
                                                        Выберите магазин
                                                </option>
                            
                                                {shops.map((shop, index) => {
                                                        return (
                                                            <option 
                                                                className={`${styles['form-field']} ${styles['select-category__options']}`} 
                                                                key={index} 
                                                                value={shop.address}
                                                            > 
                                                                {shop.address} 
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                        </div>
                                        :
                                        <>
                                            <div className={styles['form-field']}>
                                                <label className={styles['form-field__label']}>
                                                    Адрес доставки
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
                                                    Время доставки
                                                </label>
                                                <Field 
                                                    className={styles['form-field__input']}
                                                    type='datetime-local' 
                                                    id="deliveryDate" 
                                                    name="deliveryDate"
                                                    placeholder="Дата доставки" 
                                                    required
                                                />
                                            </div>
                                        </>
                                    }
                                    <div className={styles['form-field']}>
                                        <label className={styles['form-field__label']}>
                                            Способ оплаты
                                        </label>
                                        <div className={styles['form-radio']}>
                                            <label className={styles['form-radio__label']}>
                                                <Field 
                                                    className={styles['form-radio__input']} 
                                                    type="radio" name="paymentType" value="ONLINE"
                                                    required
                                                    checked={!isOnDeliveryPayment}
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
                                                    checked={isOnDeliveryPayment}
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
                        <div className={styles['checkout-form__aside']}>
                            <div className={styles['checkout-form__products']}>
                                {
                                    productCards
                                }
                            </div>
                            <div className={styles['checkout-form__price']}>
                                Итог: {price} ₽
                            </div>
                        </div>
                    </div>
                    <div className={styles['checkout-footer']}>
                        {
                            message
                        }
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