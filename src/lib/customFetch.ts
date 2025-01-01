import Cookies from 'js-cookie'

export const optionCookie = {
  expires: 1 * 60 * 60 * 1000, // 1 hour
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const customFetch = async (endpoint: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem('accessToken') || ''

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include', // tương đương withCredentials: true
    cache: 'no-cache',

    ...options,
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...defaultOptions,
      signal: AbortSignal.timeout(15000), // timeout 15s
    })

    if (response.status === 401) {
      // Xử lý refresh token
      try {
        const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
          method: 'PATCH',
          credentials: 'include',
        })
        const refreshData = await refreshResponse.json()

        if (refreshResponse.ok) {
          Cookies.set('jwt', refreshData.accessToken)
          // Thử lại request ban đầu
          return fetch(`${BASE_URL}${endpoint}`, defaultOptions)
        } else {
          Cookies.remove('jwt')
          throw new Error('Refresh token failed')
        }
      } catch (error) {
        Cookies.remove('jwt')
        throw error
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchUpload = async (endpoint: string, options: RequestInit = {}) => {
  return customFetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export default customFetch
