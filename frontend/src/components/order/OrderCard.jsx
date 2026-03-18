import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useAuthStore } from '@/store/authStore'

export function OrderCard({ order }) {
  const { user } = useAuthStore()
  const isClient = user?.role === 'client'
  const otherParty = isClient ? order.tailor : order.client
  const basePath = isClient ? '/dashboard/client' : '/dashboard/tailor'

  return (
    <Link to={`${basePath}/orders/${order.id}`} className="group block">
      <div className="glass-card p-4 rounded-sm group-hover:border-gold/40 transition-all duration-200 group-hover:shadow-gold">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar name={otherParty?.full_name} size="sm" />
            <div>
              <p className="font-ui text-sm text-ivory">{otherParty?.full_name}</p>
              <p className="font-ui text-xs text-ivory/40">
                {format(new Date(order.created_at), 'dd MMM yyyy', { locale: fr })}
              </p>
            </div>
          </div>
          <Badge status={order.status} />
        </div>
        {order.price_agreed && (
          <p className="text-gold font-ui text-sm font-semibold">
            {Number(order.price_agreed).toLocaleString()} DA
          </p>
        )}
      </div>
    </Link>
  )
}
