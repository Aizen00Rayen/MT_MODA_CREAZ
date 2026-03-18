import api from './api'

export const ordersService = {
  list: (params) => api.get('/api/orders/', { params }).then((r) => r.data),
  getById: (id) => api.get(`/api/orders/${id}/`).then((r) => r.data),
  create: (data) => api.post('/api/orders/', data).then((r) => r.data),
  updateStatus: (id, status) =>
    api.patch(`/api/orders/${id}/status/`, { status }).then((r) => r.data),
  getMessages: (id) => api.get(`/api/orders/${id}/messages/`).then((r) => r.data),
  sendMessage: (id, content) =>
    api.post(`/api/orders/${id}/messages/`, { content }).then((r) => r.data),
  getSteps: (id) => api.get(`/api/orders/${id}/steps/`).then((r) => r.data),
  initiatePayment: (id) => api.post(`/api/orders/${id}/pay/`).then((r) => r.data),
}
