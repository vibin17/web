import { Dispatch } from "react"
import { ShopLocalAction, ShopLocalActionTypes } from "../types/shopLocalTypes"

export const Init = () => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        let favors: string[] = JSON.parse(localStorage.getItem('favors') || '[]')
        let cart: string[] = JSON.parse(localStorage.getItem('cart') || '[]')
        dispatch({
            type: ShopLocalActionTypes.INIT,
            payload: [favors.length, cart.length]
        })
    }
}

export const AddToFavors = (productId: string) => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        let favors: string[] = JSON.parse(localStorage.getItem('favors') || '[]')
        favors.push(productId)
        localStorage.setItem('favors', JSON.stringify(favors))
        dispatch({
            type: ShopLocalActionTypes.ADD_TO_FAVORS
        })
    }
}

export const AddToCart = (productId: string) => {
    return async (dispatch: Dispatch<ShopLocalAction>) => {
        let cart: string[] = JSON.parse(localStorage.getItem('cart') || '[]')
        cart.push(productId)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: ShopLocalActionTypes.ADD_TO_CART
        })
    }
}