// API layer replaced with mock services — no backend required.
// This file is kept as a stub to avoid breaking any stray imports.
const api = {
  get: () => Promise.resolve({ data: {} }),
  post: () => Promise.resolve({ data: {} }),
  put: () => Promise.resolve({ data: {} }),
  patch: () => Promise.resolve({ data: {} }),
  delete: () => Promise.resolve({ data: {} }),
}

export default api
