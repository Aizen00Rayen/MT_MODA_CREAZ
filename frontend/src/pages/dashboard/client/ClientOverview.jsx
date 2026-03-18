import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useOrders } from '@/hooks/useOrders'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function ClientOverview() {
  const { user } = useAuthStore()
  const { data: ordersData, isLoading } = useOrders()
  const orders = ordersData?.results || ordersData || []
  const activeOrders = orders.filter((o) => !['completed', 'cancelled'].includes(o.status))

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ivory mb-1">
          Bonjour, {user?.full_name?.split(' ')[0]} 👋
        </h1>
        <p className="font-ui text-sm text-ivory/50">Bienvenue sur votre espace personnel.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Commandes actives', value: activeOrders.length, icon: ShoppingBag, to: '/dashboard/client/orders' },
          { label: 'Total commandes', value: orders.length, icon: ShoppingBag, to: '/dashboard/client/orders' },
          { label: 'Mes designs', value: '—', icon: Sparkles, to: '/dashboard/client/designs' },
        ].map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} className="glass-card p-5 rounded-sm hover:border-gold/30 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-ui text-xs text-ivory/50 tracking-wide uppercase mb-1">{label}</p>
                <p className="font-display text-3xl text-gold">{value}</p>
              </div>
              <Icon size={22} className="text-gold/40 group-hover:text-gold transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="glass-card p-6 rounded-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-ivory">Commandes récentes</h2>
          <Link to="/dashboard/client/orders" className="font-ui text-xs text-gold hover:text-gold-light flex items-center gap-1">
            Voir tout <ArrowRight size={12} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8"><LoadingSpinner /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-ui text-sm text-ivory/40 mb-4">Aucune commande pour l'instant.</p>
            <Link to="/couturieres">
              <Button size="sm">Trouver une couturière</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <Link key={order.id} to={`/dashboard/client/orders/${order.id}`}
                className="flex items-center justify-between p-3 bg-obsidian rounded-sm hover:bg-charcoal transition-colors">
                <div>
                  <p className="font-ui text-sm text-ivory">{order.tailor?.full_name}</p>
                  <p className="font-ui text-xs text-ivory/40">{new Date(order.created_at).toLocaleDateString('fr-DZ')}</p>
                </div>
                <Badge status={order.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
