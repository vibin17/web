import { useEffect, useState } from 'react'
import { OrderResponse } from '../../services/models/shop-models'
import ShopService from '../../services/ShopService/shop-service'
import OrderCard from './OrderCard/OrderCard'
import styles from './OrdersHistory.module.scss'

const OrdersHistoryPage = () => {
    let [orders, setOrders] = useState<OrderResponse[]>([])
    useEffect(() => {
        (async () => {
            let orders = (await ShopService.getUserOrders()).data
            setOrders(orders)
        })()
    }, [])
    return (
        <div className={styles['orders']}>
            <div className={styles['orders-header']}>
                История заказов
            </div>
            <div className={styles['orders-main']}>
                {
                    orders.map((order, index) => {
                        return <OrderCard order={order} key={index}/>
                    })
                }
            </div>
        </div>
    )
}

export default OrdersHistoryPage