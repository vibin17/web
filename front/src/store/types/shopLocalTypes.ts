export type ShopLocalState = {
    favorsCount: number
    cartPrice: number
}

export enum ShopLocalActionTypes {
    ADD_TO_FAVORS = 'ADD_TO_FAVORS',
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_FAVORS = 'REMOVE_FROM_FAVORS',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    CLEAR_FAVORS = 'CLEAR_FAVORS',
    CLEAR_CART = 'CLEAR_CART',
    INIT = 'INIT'
}

type InitAction = {
    type: ShopLocalActionTypes.INIT
    payload: [number, number]
}

type AddToFavorsAction = {
    type: ShopLocalActionTypes.ADD_TO_FAVORS
}

type AddToCartAction = {
    type: ShopLocalActionTypes.ADD_TO_CART,
    payload: number
}

type RemoveFromFavorsAction = {
    type: ShopLocalActionTypes.REMOVE_FROM_FAVORS
}

type RemoveFromCartAction = {
    type: ShopLocalActionTypes.REMOVE_FROM_CART,
    payload: number
}

type ClearFavors = {
    type: ShopLocalActionTypes.CLEAR_FAVORS
}

type ClearCart = {
    type: ShopLocalActionTypes.CLEAR_CART
}

export type ShopLocalAction = InitAction | AddToFavorsAction | AddToCartAction
                            | RemoveFromFavorsAction | RemoveFromCartAction | ClearFavors | ClearCart