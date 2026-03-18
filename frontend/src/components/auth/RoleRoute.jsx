import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function RoleRoute({ role, children }) {
  const user = useAuthStore((s) => s.user)

  if (!user || user.role !== role) {
    if (user?.role === 'admin') return <Navigate to="/admin" replace />
    if (user?.role === 'tailor') return <Navigate to="/dashboard/tailor" replace />
    return <Navigate to="/dashboard/client" replace />
  }

  return children
}
