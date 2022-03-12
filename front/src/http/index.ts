import axios from "axios";
import { AuthResponse } from "../models/response/authModels";

const AUTH_URL = 'http://localhost:7000'

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
    if (error.response.status == 401) {
        try {
            const response = await axios.get<AuthResponse>(`${AUTH_URL}/auth/refresh`)
            localStorage.setItem('access', response.data.access)
        }
    }
})

