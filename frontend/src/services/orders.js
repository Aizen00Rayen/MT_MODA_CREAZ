import { ORDERS } from '@/data/mockData'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// In-memory store so mutations persist during the session
let orders = [...ORDERS]

export const ordersService = {
  list: async (params = {}) => {
    await delay()
    let results = [...orders]
    if (params.status) results = results.filter((o) => o.status === params.status)
    if (params.role === 'tailor') results = results.filter((o) => o.tailor?.id === 't-1')
    return { results, count: results.length }
  },

  getById: async (id) => {
    await delay()
    const order = orders.find((o) => o.id === id)
    if (!order) throw new Error('Commande introuvable')
    return order
  },

  create: async (data) => {
    await delay()
    const newOrder = {
      id: `o-${Date.now()}`,
      client: { id: 'u-client', full_name: 'Amira Benali', role: 'client' },
      status: 'pending',
      created_at: new Date().toISOString(),
      steps: [{ id: `s-${Date.now()}`, label: 'Commande reçue', completed: true, date: new Date().toISOString() }],
      messages: [],
      ...data,
    }
    orders = [newOrder, ...orders]
    return newOrder
  },

  updateStatus: async (id, status) => {
    await delay()
    orders = orders.map((o) => (o.id === id ? { ...o, status } : o))
    return orders.find((o) => o.id === id)
  },

  getMessages: async (id) => {
    await delay()
    return orders.find((o) => o.id === id)?.messages || []
  },

  sendMessage: async (id, content) => {
    await delay()
    const msg = { id: `m-${Date.now()}`, sender: 'client', content, created_at: new Date().toISOString() }
    orders = orders.map((o) =>
      o.id === id ? { ...o, messages: [...(o.messages || []), msg] } : o
    )
    return msg
  },

  getSteps: async (id) => {
    await delay()
    return orders.find((o) => o.id === id)?.steps || []
  },

  initiatePayment: async () => {
    await delay()
    return { payment_url: '#', status: 'mock' }
  },
}
