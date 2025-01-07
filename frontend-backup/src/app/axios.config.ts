import { LocalStorageKeys } from '@/shared'
import axios from 'axios'

const httpService = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LocalStorageKeys.Token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

httpService.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default httpService
