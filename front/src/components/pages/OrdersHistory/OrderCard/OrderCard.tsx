import { useEffect, useState } from "react"
import ProductIdListCard from "../../../ProductListCard/ProductIdListCard"
import { OrderResponse } from "../../../../services/models/shop-models"
import styles from './OrderCard.module.scss'

type props = {
    order: OrderResponse
}

const OrderCard = ({ order }: props) => {
    let [date, setDate] = useState<Date>(new Date('01-01-2022'))
    useEffect(() => {
        (async () => {
            let orderDate = new Date(order.orderDate)
            setDate(orderDate)
        })()
    }, [])
    return (
        <div className={styles['order-card']}>
            <div className={styles['card-header']}>
                <div className={styles['card-header__item']}>
                    Идентификатор заказа: <b>
                        { order._id }
                    </b>
                </div>
                <div className={styles['card-header__item']}>
                    Дата заказа: <b>
                        {`
                            ${date.getDate() < 10?
                                `0${date.getDate()}`
                                :
                                `${date.getDate()}`
                            }.${date.getMonth() + 1 < 10?
                                `0${date.getMonth() + 1}`
                                :
                                `${date.getMonth() + 1}` 
                            }.${date.getFullYear()}
                            ${date.getHours() < 10?
                                `0${date.getHours()}`
                                :
                                `${date.getHours()}`
                            }:${date.getMinutes() < 10?
                                `0${date.getMinutes()}`
                                :
                                `${date.getMinutes()}`
                            }
                        `}
                    </b>
                </div>
                <div className={styles['card-header__item']}>
                    {
                        order.orderType === 'DELIVERY'?
                            `Заказ будет ждать вас в магазине по адресу`
                            :
                            `Заказ будет доставлен по адресу`
                    }: {order.deliveryAddress}
                </div>
                <div className={styles['card-header__item']}>
                    {
                        order.paymentType === 'ONLINE'?
                            `Оплачено`
                            :
                            `К оплате`
                    }:<b> {order.price} ₽ </b>
                </div>
            </div>
            <div className={styles['card-main']}>
                {
                    order.products.map((id, index) => {
                        console.log(id);
                        return <ProductIdListCard productId={id} cardKey={index} key={index} ordersHistoryMode/>
                    })
                }

            </div>
        </div>
    )
}

export default OrderCard