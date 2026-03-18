import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function AdminOrders() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => api.get('/api/orders/').then((r) => r.data),
  })
  const orders = data?.results || data || []

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Toutes les commandes</h1>
      {isLoading ? <LoadingSpinner size="lg" /> : (
        <div className="space-y-2">
          {orders.map((o) => (
            <div key={o.id} className="glass-card p-4 rounded-sm flex items-center justify-between">
              <div>
                <p className="font-ui text-sm text-ivory">
                  {o.client?.full_name} → {o.tailor?.full_name}
                </p>
                <p className="font-ui text-xs text-ivory/40">{new Date(o.created_at).toLocaleDateString('fr-DZ')}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge status={o.status} />
                {o.price_agreed && (
                  <span className="font-ui text-xs text-gold">{Number(o.price_agreed).toLocaleString()} DA</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
