import axios from "axios"
import { Dispatch } from "react"
import { AUTH_URL} from "../../http"
import { AuthResponse } from "../../models/response/authModels"
import AuthService from "../../services/AuthService/AuthService"
import { AuthAction, AuthActionTypes } from "../types/authTypes"

export const signIn = (name: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.LOADING
            })
            const response = await AuthService.signIn({ userName: name, password })
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            dispatch({
                type: AuthActionTypes.SIGN_IN_SUCCESS,
                payload: {
                    ...response.data, 
                    isSignedIn: true
                }
            })
            window.location.reload()
        }
        catch (error) {
            dispatch({
                type: AuthActionTypes.SIGN_IN_FAILED,
                payload: 'Неправильный логин или пароль'
            })
        }
    }
}

export const signUp = (name: string, phoneNumber: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.LOADING
            })
            const response = await AuthService.signUp({ userName: name, phoneNumber, password })
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            dispatch({
                type: AuthActionTypes.SIGN_IN_SUCCESS,
                payload: {
                    ...response.data, 
                    isSignedIn: true
                }
            })
            window.location.reload()
        }
        catch (error) {
            dispatch({
                type: AuthActionTypes.SIGN_IN_FAILED,
                payload: 'Неправильный логин или пароль'
            })
        }
    }
}

export const checkAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({
                type: AuthActionTypes.LOADING
            })
            const response = await axios.post<AuthResponse>(`${AUTH_URL}/auth/refresh`, { 
                refresh: localStorage.getItem('refresh')
            }, {
                withCredentials: true
            })
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            dispatch({
                type: AuthActionTypes.SIGN_IN_SUCCESS,
                payload: {
                    ...response.data,
                    isSignedIn: true
                }
            })
        }
        catch (error) {
            dispatch({
                type: AuthActionTypes.SIGN_IN_FAILED,
                payload: ''
            })
        }
    }
}

export const signOut = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        window.location.reload()
        dispatch({
            type: AuthActionTypes.SIGN_OUT
        })
    }
}

