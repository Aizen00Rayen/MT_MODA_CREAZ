import api from './api'

export const designsService = {
  list: (params) => api.get('/api/designs/', { params }).then((r) => r.data),
  generate: (data, preview = false) =>
    api.post(`/api/designs/generate/${preview ? '?preview=true' : ''}`, data).then((r) => r.data),
  toggleSave: (id) => api.patch(`/api/designs/${id}/save/`).then((r) => r.data),
}
