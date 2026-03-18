import api from './api'

export const tailorsService = {
  list: (params) => api.get('/api/tailors/', { params }).then((r) => r.data),
  featured: () => api.get('/api/tailors/featured/').then((r) => r.data),
  getById: (id) => api.get(`/api/tailors/${id}/`).then((r) => r.data),
  updateProfile: (data) => api.patch('/api/tailors/profile/', data).then((r) => r.data),
  getOwnProfile: () => api.get('/api/tailors/profile/').then((r) => r.data),
  getPortfolio: () => api.get('/api/tailors/portfolio/').then((r) => r.data),
  addPortfolioItem: (data) => api.post('/api/tailors/portfolio/', data).then((r) => r.data),
  deletePortfolioItem: (id) => api.delete(`/api/tailors/portfolio/${id}/`).then((r) => r.data),
  getUploadSignature: () => api.get('/api/tailors/upload-signature/').then((r) => r.data),
}
