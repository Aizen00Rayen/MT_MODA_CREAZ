import { useOrders, useUpdateOrderStatus } from '@/hooks/useOrders'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Inbox } from 'lucide-react'

export default function IncomingRequests() {
  const { data: ordersData, isLoading } = useOrders()
  const { mutate: updateStatus } = useUpdateOrderStatus()
  const orders = (ordersData?.results || ordersData || []).filter((o) => o.status === 'pending')

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Nouvelles demandes</h1>

      {isLoading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : orders.length === 0 ? (
        <EmptyState icon={Inbox} title="Aucune demande" description="Les nouvelles demandes apparaîtront ici." />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="glass-card p-5 rounded-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-display text-lg text-ivory">{order.client?.full_name}</p>
                  <p className="font-ui text-xs text-ivory/40">{new Date(order.created_at).toLocaleDateString('fr-DZ')}</p>
                </div>
                <Badge status="pending" />
              </div>
              <p className="font-ui text-sm text-ivory/70 mb-4 leading-relaxed">{order.description}</p>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  onClick={() => updateStatus({ id: order.id, status: 'confirmed' })}
                  className="flex-1"
                >
                  Accepter
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => updateStatus({ id: order.id, status: 'cancelled' })}
                  className="flex-1"
                >
                  Refuser
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
