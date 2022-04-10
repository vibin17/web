import { Dispatch } from "react"
import ShopService from "../../services/ShopService/shop-service"
import { ShopLocalAction, ShopLocalActionTypes } from "../types/shopLocalTypes"

export const initShopLocal = () => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        let favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
        let cart: string[] = JSON.parse(localStorage.getItem('cart')?? '[]')
        let prices: number[] = []
        for (let productId of cart) {
            let price = (await ShopService.getProductSummaryById(productId)).data.price
            prices.push(parseInt(price))
        }
        let totalPrice = prices.reduce((a, b) => a + b, 0)
        dispatch({
            type: ShopLocalActionTypes.INIT,
            payload: [favors.length, totalPrice]
        })
    }
}

export const addToFavors = (productId: string) => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        let favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
        if (!favors.includes(productId)) {
            favors.push(productId)
            localStorage.setItem('favors', JSON.stringify(favors))
            dispatch({
                type: ShopLocalActionTypes.ADD_TO_FAVORS
            })
        }
    }
}

export const addToCart = (productId: string, productPrice: string) => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        let cart: string[] = JSON.parse(localStorage.getItem('cart')?? '[]')
        // if (!cart.includes(productId)) {
        //     cart.push(productId)
        //     localStorage.setItem('cart', JSON.stringify(cart))
        //     dispatch({
        //         type: ShopLocalActionTypes.ADD_TO_CART,
        //         payload: parseInt(productPrice)
        //     })
        // }
        cart.push(productId)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: ShopLocalActionTypes.ADD_TO_CART,
            payload: parseInt(productPrice)
        })
    }
}

export const RemoveFromFavors = (productIndex: number) => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        let favors: string[] = JSON.parse(localStorage.getItem('favors')?? '[]')
        favors = [...favors.slice(0, productIndex), ...favors.slice(productIndex + 1)]
        localStorage.setItem('favors', JSON.stringify(favors))
        dispatch({
            type: ShopLocalActionTypes.REMOVE_FROM_FAVORS
        })
    }
}

export const removeFromCart = (productIndex: number, productPrice: string) => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        let cart: string[] = JSON.parse(localStorage.getItem('cart')?? '[]')
        cart = [...cart.slice(0, productIndex), ...cart.slice(productIndex + 1)]
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: ShopLocalActionTypes.REMOVE_FROM_CART,
            payload: parseInt(productPrice)
        })
    }
}

export const clearFavors = () => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        localStorage.removeItem('favors')
        dispatch({
            type: ShopLocalActionTypes.CLEAR_FAVORS
        })
    }
}

export const clearCart = () => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        localStorage.removeItem('cart')
        dispatch({
            type: ShopLocalActionTypes.CLEAR_CART
        })
    }
}