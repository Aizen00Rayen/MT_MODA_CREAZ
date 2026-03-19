import { NOTIFICATIONS } from '@/data/mockData'

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

let notifications = [...NOTIFICATIONS]

export const notificationsService = {
  list: async () => {
    await delay()
    return { results: notifications, count: notifications.length }
  },

  unreadCount: async () => {
    await delay()
    return { count: notifications.filter((n) => !n.read).length }
  },

  markRead: async (id) => {
    await delay()
    notifications = id
      ? notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      : notifications.map((n) => ({ ...n, read: true }))
  },
}
