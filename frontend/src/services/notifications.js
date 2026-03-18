import api from './api'

export const notificationsService = {
  list: () => api.get('/api/notifications/').then((r) => r.data),
  unreadCount: () => api.get('/api/notifications/unread-count/').then((r) => r.data),
  markRead: (id) =>
    id
      ? api.post(`/api/notifications/${id}/mark-read/`).then((r) => r.data)
      : api.post('/api/notifications/mark-read/').then((r) => r.data),
}
