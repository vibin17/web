import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import ProductListCard from "../../ProductListCard/ProductListCard"
import { useShopLocalActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import styles from './CartPage.module.scss'

const CartPage = () => {
    let [productIds, setProductIds] = useState<string[]>([])
    let { cartPrice } =  useTypedSelector(state => state.shopLocal)
    let { clearCart } = useShopLocalActions()
    let favors = useMemo(() => {
        return JSON.parse(localStorage.getItem('favors')?? '[]')
    }, [])
    let productCards = useMemo(() => {
        return  productIds.map((productId, index) => {
            return <ProductListCard key={index} 
                        cardKey={index} 
                        favored={favors.includes(productId)} 
                        productId={productId} 
                        cartMode
                    />
        })
    }, [productIds])
    useEffect(() => {
        (async () => {
            let cart: string[] = JSON.parse(localStorage.getItem('cart') || '[]')
            setProductIds(cart)
        })()
    }, [])
    return <div className={styles['cart']}> {
            cartPrice ? 
                <>
                    <div className={styles['cart-header']}>
                        <div className={styles['cart-header__label']}>
                            В корзине товаров на сумму <b> {cartPrice} ₽</b>
                        </div>
                        <button className={styles['cart-header__button']}
                            onClick={() => {
                                clearCart()
                                setTimeout(() => {
                                    window.location.reload()
                                }, 100)
                            }}>
                            Очистить корзину
                        </button>
                    </div>
                    <div className={styles['cart-products']}> {
                        productCards
                    }
                    </div>
                    <div className={styles['cart-footer']}>
                        <Link to='checkout' className={styles['cart-footer__button']}>
                            Оформить заказ
                        </Link>
                    </div>
                </>
                :
                <div className={styles['cart-header']}>
                    <div className={styles['cart-header__label']}>
                        В корзине пусто
                    </div>
                </div>

        }  
    </div>
}

export default CartPage