import { DEMO_USERS } from '@/data/mockData'

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

export const authService = {
  login: async (email, _password) => {
    await delay()
    const user = Object.values(DEMO_USERS).find((u) => u.email === email)
    if (!user) throw new Error('Email ou mot de passe incorrect')
    return {
      access: 'mock-access-token',
      refresh: 'mock-refresh-token',
      user_id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    }
  },

  register: async (data) => {
    await delay()
    return {
      id: 'u-new',
      email: data.email,
      full_name: data.full_name,
      role: data.role || 'client',
      tokens: { access: 'mock-access-token', refresh: 'mock-refresh-token' },
    }
  },

  logout: async () => { await delay(100) },
  refresh: async () => ({ access: 'mock-access-token' }),
  getProfile: async () => { await delay(); return DEMO_USERS.client },
  updateProfile: async (data) => { await delay(); return data },
}
