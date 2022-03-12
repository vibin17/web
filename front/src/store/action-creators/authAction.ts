import { Dispatch } from "react"
import AuthService from "../../services/AuthService/AuthService"
import { AuthAction, AuthActionTypes } from "../types/authTypes"

export const signIn = (name: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await AuthService.signIn({ userName: name, password })
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            dispatch({
                type: AuthActionTypes.SIGN_IN_SUCCESS,
                payload: {
                    ...response.data, 
                    signedIn: true
                }
            })
        }
        catch (error) {
            dispatch({
                type: AuthActionTypes.SIGN_IN_FAILED,
                payload: 'Неправильный логин или пароль'
            })
        }
    }
}

export const readLocalState = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        const localData = JSON.parse(localStorage.getItem('auth') || '{}')
        dispatch({
            type: AuthActionTypes.READ_LOCAL,
            payload: localData
        })
    }
}
