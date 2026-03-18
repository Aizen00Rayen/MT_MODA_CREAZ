import api from './api'

export const authService = {
  register: (data) => api.post('/api/auth/register/', data).then((r) => r.data),
  login: (email, password) =>
    api.post('/api/auth/login/', { email, password }).then((r) => r.data),
  logout: (refreshToken) =>
    api.post('/api/auth/logout/', { refresh: refreshToken }).then((r) => r.data),
  refresh: (refreshToken) =>
    api.post('/api/auth/refresh/', { refresh: refreshToken }).then((r) => r.data),
  getProfile: () => api.get('/api/auth/profile/').then((r) => r.data),
  updateProfile: (data) => api.patch('/api/auth/profile/', data).then((r) => r.data),
}
