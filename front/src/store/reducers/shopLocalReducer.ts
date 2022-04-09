import { ShopLocalAction, ShopLocalActionTypes, ShopLocalState } from "../types/shopLocalTypes"

const initialState: ShopLocalState = {
    favorsCount: 0,
    cartPrice: 0
}

export const shopLocalReducer = (state = initialState, action: ShopLocalAction): ShopLocalState => {
    switch (action.type) {
        case ShopLocalActionTypes.INIT:
            return {
                favorsCount: action.payload[0],
                cartPrice: action.payload[1]
            }
        
        case ShopLocalActionTypes.ADD_TO_FAVORS:
            return {
                favorsCount: state.favorsCount + 1,
                cartPrice: state.cartPrice
            }

        case ShopLocalActionTypes.ADD_TO_CART:
            return {
                favorsCount: state.favorsCount,
                cartPrice: state.cartPrice + action.payload
            }

        case ShopLocalActionTypes.CLEAR_FAVORS:
            return {
                favorsCount: 0,
                cartPrice: state.cartPrice
            }
        
        case ShopLocalActionTypes.CLEAR_CART:
        return {
            favorsCount: state.favorsCount,
            cartPrice: 0
        }

        default:
            return state
    }
}