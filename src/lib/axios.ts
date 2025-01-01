import axios from 'axios'
import Cookies from 'js-cookie'

export const optionCookie = {
  expires: 1 * 60 * 60 * 1000, // 1 hour
  // sameSite: "Strict",
  // HttpOnly: true,
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseEncoding: 'utf8',
  responseType: 'json',
  timeout: 15000, // 15 seconds
  timeoutErrorMessage: 'Request timeout',
  withCredentials: true,
})

export const axiosUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
})

axiosUpload.interceptors.request.use(
  (config) => {
    if (!config.headers['Authorization']) {
      const accessToken = localStorage.getItem('accessToken') || ''

      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosUpload.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const prevReq = error.config

    if (error.response?.status === 401 && !prevReq._retry) {
      prevReq._retry = true
      Cookies.remove('jwt')
      localStorage.clear()
    }

    return Promise.reject(error)
  },
)

axiosClient.interceptors.request.use(
  (config) => {
    if (!config.headers['Authorization']) {
      const accessToken = localStorage.getItem('accessToken') || ''

      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const prevReq = error.config

    if (error.response?.status === 401 && !prevReq._retry) {
      prevReq._retry = true
      Cookies.remove('jwt')
      localStorage.clear()
    }

    return Promise.reject(error)
  },
)

export default axiosClient
