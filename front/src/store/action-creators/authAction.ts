import axios from "axios"
import { Dispatch } from "react"
import { AUTH_URL} from "../../http"
import { AuthResponse } from "../../models/response/auth-models"
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
                    isSignedIn: false
                }
            })
            setTimeout(() => {
                dispatch({
                    type: AuthActionTypes.SIGN_IN_SUCCESS,
                    payload: {
                        ...response.data, 
                        isSignedIn: true
                    }
                })
                window.location.reload()
            }, 500)
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
            dispatch({
                type: AuthActionTypes.SIGN_UP_SUCCESS
            })
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)

            setTimeout(() => {
                dispatch({
                    type: AuthActionTypes.SIGN_IN_SUCCESS,
                    payload: {
                        ...response.data, 
                        isSignedIn: true
                    }
                })
                window.location.reload()
            }, 500)
        }
        catch (error) {
            dispatch({
                type: AuthActionTypes.SIGN_UP_FAILED,
                payload: 'Пользователь с таким именем или номером телефона уже существует'
            })
        }
    }
}

export const checkAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
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
        dispatch({
            type: AuthActionTypes.SIGN_OUT
        })
    }
}

