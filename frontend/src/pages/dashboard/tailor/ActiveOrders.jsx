import { useOrders } from '@/hooks/useOrders'
import { OrderCard } from '@/components/order/OrderCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Package } from 'lucide-react'

export default function ActiveOrders() {
  const { data: ordersData, isLoading } = useOrders()
  const orders = (ordersData?.results || ordersData || []).filter((o) => o.status !== 'pending')

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Commandes</h1>

      {isLoading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : orders.length === 0 ? (
        <EmptyState icon={Package} title="Aucune commande" description="Les commandes confirmées apparaîtront ici." />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </div>
  )
}
