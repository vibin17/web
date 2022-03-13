import axios from "axios";
import { AuthResponse } from "../models/response/authModels";

export const AUTH_URL = 'http://localhost:7000'

export const authAPI = axios.create({
    baseURL: AUTH_URL,
    withCredentials: true
})

authAPI.interceptors.request.use((config) => {
    const access = `Bearer ${localStorage.getItem('access')}`
    config.headers = {
        Authorization: access
    }
    return config
})

authAPI.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        try {
            const response = await axios.post<AuthResponse>(`${AUTH_URL}/auth/refresh`, {refresh: localStorage.getItem('refresh')})
            localStorage.setItem('access', response.data.access)
            return authAPI.request(originalRequest)
        }
        catch (error) {
            console.log('Пользователь не авторизован')
        }
    }
    throw error
})

