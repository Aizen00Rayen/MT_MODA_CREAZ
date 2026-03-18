import api from './api'

export const reviewsService = {
  create: (data) => api.post('/api/reviews/', data).then((r) => r.data),
  getForTailor: (tailorId) => api.get(`/api/reviews/tailor/${tailorId}/`).then((r) => r.data),
  getMine: () => api.get('/api/reviews/mine/').then((r) => r.data),
}
