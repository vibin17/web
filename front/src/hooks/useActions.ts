import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as AuthActions from "../store/action-creators/authAction"

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(AuthActions, dispatch)
}