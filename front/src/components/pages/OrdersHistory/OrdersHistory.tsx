import { useEffect, useMemo, useState } from 'react'
import { arrayBuffer } from 'stream/consumers'
import { OrderResponse } from '../../../services/models/shop-models'
import ShopService from '../../../services/ShopService/shop-service'
import OrderCard from './OrderCard/OrderCard'
import styles from './OrdersHistory.module.scss'

const OrdersHistoryPage = () => {
    let [orders, setOrders] = useState<OrderResponse[]>([])
    let orderCards = useMemo(() => {
        return orders.map((order, index) => {
            return <OrderCard order={order} key={index}/>
        })
    }, [orders])
    useEffect(() => {
        (async () => {
            let orders = (await ShopService.getUserOrders()).data
            orders.reverse()
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
                    orderCards
                }
            </div>
        </div>
    )
}

export default OrdersHistoryPage