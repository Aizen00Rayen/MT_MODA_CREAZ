import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/authStore'
import { DEMO_USERS } from '@/data/mockData'

export function useLogin() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      setAuth(
        { id: data.user_id, email: data.email, full_name: data.full_name, role: data.role },
        data.access,
        data.refresh
      )
      toast.success('Connexion réussie')
      if (data.role === 'admin') navigate('/admin')
      else if (data.role === 'tailor') navigate('/dashboard/tailor')
      else navigate('/dashboard/client')
    },
    onError: () => toast.error('Email ou mot de passe incorrect'),
  })
}

export function useDemoLogin() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return (role) => {
    const user = DEMO_USERS[role]
    setAuth(user, 'mock-access-token', 'mock-refresh-token')
    toast.success(`Connecté en tant que ${role === 'client' ? 'Cliente' : role === 'tailor' ? 'Couturière' : 'Admin'}`)
    if (role === 'admin') navigate('/admin')
    else if (role === 'tailor') navigate('/dashboard/tailor')
    else navigate('/dashboard/client')
  }
}

export function useRegister() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data) => authService.register(data),
    onSuccess: (data) => {
      setAuth(
        { id: data.id, email: data.email, full_name: data.full_name, role: data.role },
        data.tokens.access,
        data.tokens.refresh
      )
      toast.success('Compte créé avec succès')
      if (data.role === 'tailor') navigate('/dashboard/tailor')
      else navigate('/dashboard/client')
    },
    onError: () => toast.error("Erreur lors de l'inscription"),
  })
}

export function useLogout() {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return () => {
    logout()
    queryClient.clear()
    navigate('/')
    toast.success('Déconnecté')
  }
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
  })
}
