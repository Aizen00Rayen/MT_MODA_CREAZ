import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/authStore'

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
      const role = data.role
      if (role === 'admin') navigate('/admin')
      else if (role === 'tailor') navigate('/dashboard/tailor')
      else navigate('/dashboard/client')
    },
    onError: () => toast.error('Email ou mot de passe incorrect'),
  })
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
      const role = data.role
      if (role === 'tailor') navigate('/dashboard/tailor')
      else navigate('/dashboard/client')
    },
    onError: (err) => {
      const msg = err.response?.data?.email?.[0] || 'Erreur lors de l\'inscription'
      toast.error(msg)
    },
  })
}

export function useLogout() {
  const { logout, refreshToken } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return () => {
    authService.logout(refreshToken).catch(() => {})
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
