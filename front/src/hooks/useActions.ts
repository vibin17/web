import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as AuthActions from "../store/action-creators/authAction"
import * as ShopLocalActions from "../store/action-creators/shopLocalAction"

export const useAuthActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(AuthActions, dispatch)
}

export const useShopLocalActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ShopLocalActions, dispatch)
}