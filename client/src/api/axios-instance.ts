import axios from "axios"
import type { InternalAxiosRequestConfig } from 'axios';
const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL,
    timeout:10000,
    headers:{
        'Content-Type':'application/json'
    }
})

// Request Interceptor: Add tokens or modify request config

axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) : InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token'); 
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error?.response?.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error)
    } 
)

export default axiosInstance