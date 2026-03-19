import { REVIEWS } from '@/data/mockData'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

let reviews = [...REVIEWS]

export const reviewsService = {
  create: async (data) => {
    await delay()
    const review = { id: `r-${Date.now()}`, created_at: new Date().toISOString(), ...data }
    reviews = [review, ...reviews]
    return review
  },

  getForTailor: async (tailorId) => {
    await delay()
    return reviews.filter((r) => r.tailor_id === tailorId)
  },

  getMine: async () => {
    await delay()
    return reviews.filter((r) => r.client?.id === 'u-client')
  },
}
