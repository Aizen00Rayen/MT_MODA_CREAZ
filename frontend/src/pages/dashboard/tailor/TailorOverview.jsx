import { Link } from 'react-router-dom'
import { Package, Star, DollarSign, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useOrders } from '@/hooks/useOrders'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function TailorOverview() {
  const { user } = useAuthStore()
  const { data: ordersData, isLoading } = useOrders()
  const orders = ordersData?.results || ordersData || []
  const pending = orders.filter((o) => o.status === 'pending')
  const active = orders.filter((o) => !['completed', 'cancelled', 'pending'].includes(o.status))
  const completed = orders.filter((o) => o.status === 'completed')

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ivory mb-1">Bienvenue, {user?.full_name?.split(' ')[0]}</h1>
        <p className="font-ui text-sm text-ivory/50">Votre atelier numérique.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'En attente', value: pending.length, icon: Package, color: 'text-yellow-400', to: '/dashboard/tailor/requests' },
          { label: 'En cours', value: active.length, icon: Package, color: 'text-blue-400', to: '/dashboard/tailor/orders' },
          { label: 'Terminées', value: completed.length, icon: DollarSign, color: 'text-green-400', to: '/dashboard/tailor/orders' },
          { label: 'Total', value: orders.length, icon: Star, color: 'text-gold', to: '/dashboard/tailor/orders' },
        ].map(({ label, value, icon: Icon, color, to }) => (
          <Link key={label} to={to} className="glass-card p-4 rounded-sm hover:border-gold/30 transition-colors group">
            <Icon size={18} className={`${color} mb-2`} />
            <p className="font-display text-3xl text-ivory">{value}</p>
            <p className="font-ui text-xs text-ivory/40 uppercase tracking-wide">{label}</p>
          </Link>
        ))}
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <div className="glass-card p-6 rounded-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-ivory">Nouvelles demandes</h2>
            <Link to="/dashboard/tailor/requests" className="font-ui text-xs text-gold flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          {isLoading ? <LoadingSpinner /> : (
            <div className="space-y-3">
              {pending.slice(0, 3).map((order) => (
                <Link key={order.id} to={`/dashboard/tailor/orders/${order.id}`}
                  className="flex items-center justify-between p-3 bg-obsidian rounded-sm hover:bg-charcoal transition-colors">
                  <div>
                    <p className="font-ui text-sm text-ivory">{order.client?.full_name}</p>
                    <p className="font-ui text-xs text-ivory/40">{new Date(order.created_at).toLocaleDateString('fr-DZ')}</p>
                  </div>
                  <Badge status="pending" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
