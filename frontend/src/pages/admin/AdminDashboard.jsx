import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/api/admin/stats/').then((r) => r.data),
  })

  if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ivory mb-1">Administration</h1>
        <p className="font-ui text-xs text-ivory/40">Vue d'ensemble de la plateforme</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats && Object.entries({
          'Utilisateurs': stats.total_users,
          'Clientes': stats.total_clients,
          'Couturières': stats.total_tailors,
          'Vérifiées': stats.verified_tailors,
          'En attente verif.': stats.pending_verification,
          'Total commandes': stats.total_orders,
          'Commandes actives': stats.active_orders,
        }).map(([label, value]) => (
          <div key={label} className="glass-card p-4 rounded-sm">
            <p className="font-display text-3xl text-gold">{value}</p>
            <p className="font-ui text-xs text-ivory/40 uppercase tracking-wide mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
