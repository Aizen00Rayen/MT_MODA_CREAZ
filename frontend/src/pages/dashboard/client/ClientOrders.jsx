import { Link } from 'react-router-dom'
import { useOrders } from '@/hooks/useOrders'
import { OrderCard } from '@/components/order/OrderCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ClientOrders() {
  const { data: ordersData, isLoading } = useOrders()
  const orders = ordersData?.results || ordersData || []

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Mes commandes</h1>

      {isLoading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Aucune commande"
          description="Trouvez une couturière et passez votre première commande."
          action={<Link to="/couturieres"><Button>Trouver une couturière</Button></Link>}
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </div>
  )
}
