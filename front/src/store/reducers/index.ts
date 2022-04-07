import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { shopLocalReducer } from "./shopLocalReducer"

export const rootReducer = combineReducers({
    auth: authReducer,
    shopLocal: shopLocalReducer
})

export type RootState = ReturnType<typeof rootReducer>