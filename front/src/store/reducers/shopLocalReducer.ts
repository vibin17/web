import { ShopLocalAction, ShopLocalActionTypes, ShopLocalState } from "../types/shopLocalTypes"

const initialState: ShopLocalState = {
    favorsCount: 0,
    cartCount: 0
}

export const shopLocalReducer = (state = initialState, action: ShopLocalAction): ShopLocalState => {
    switch (action.type) {
        case ShopLocalActionTypes.INIT:
            return {
                favorsCount: action.payload[0],
                cartCount: action.payload[1]
            }
        
        case ShopLocalActionTypes.ADD_TO_FAVORS:
            return {
                favorsCount: state.favorsCount + 1,
                cartCount: state.cartCount
            }

        case ShopLocalActionTypes.ADD_TO_CART:
            return {
                favorsCount: state.favorsCount,
                cartCount: state.cartCount + 1
            }

        default:
            return state
    }
}