import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach access token
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Response interceptor — refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const { refreshToken, setAuth, logout, user } = useAuthStore.getState()
      if (!refreshToken) {
        logout()
        window.location.href = '/login'
        return Promise.reject(error)
      }
      try {
        const { data } = await axios.post('/api/auth/refresh/', { refresh: refreshToken })
        setAuth(user, data.access, refreshToken)
        original.headers.Authorization = `Bearer ${data.access}`
        return api(original)
      } catch {
        logout()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
