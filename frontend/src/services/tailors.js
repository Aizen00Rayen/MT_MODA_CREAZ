import { TAILORS } from '@/data/mockData'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

export const tailorsService = {
  list: async (params = {}) => {
    await delay()
    let results = [...TAILORS]
    if (params.search) {
      const q = params.search.toLowerCase()
      results = results.filter(
        (t) =>
          t.display_name.toLowerCase().includes(q) ||
          t.wilaya.toLowerCase().includes(q) ||
          t.specialties.some((s) => s.includes(q))
      )
    }
    if (params.wilaya) results = results.filter((t) => t.wilaya === params.wilaya)
    if (params.specialty) results = results.filter((t) => t.specialties.includes(params.specialty))
    return { results, count: results.length }
  },

  featured: async () => {
    await delay()
    return TAILORS.filter((t) => t.is_verified).slice(0, 4)
  },

  getById: async (id) => {
    await delay()
    const tailor = TAILORS.find((t) => t.id === id)
    if (!tailor) throw new Error('Couturière introuvable')
    return tailor
  },

  updateProfile: async (data) => { await delay(); return data },
  getOwnProfile: async () => { await delay(); return TAILORS[0] },
  getPortfolio: async () => { await delay(); return TAILORS[0].portfolio },
  addPortfolioItem: async (data) => {
    await delay()
    return { id: `p-${Date.now()}`, ...data }
  },
  deletePortfolioItem: async () => { await delay() },
  getUploadSignature: async () => { await delay(); return { signature: 'mock', timestamp: Date.now() } },
}
