import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useOrder, useUpdateOrderStatus } from '@/hooks/useOrders'
import { useOrderWebSocket } from '@/hooks/useWebSocket'
import { OrderStatusTimeline } from '@/components/order/OrderStatusTimeline'
import { MessageThread } from '@/components/order/MessageThread'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const NEXT_STATUS = {
  confirmed: 'measuring', measuring: 'cutting', cutting: 'sewing',
  sewing: 'fitting', fitting: 'delivery', delivery: 'completed',
}
const NEXT_LABEL = {
  confirmed: 'Commencer les mesures',
  measuring: 'Passer à la découpe',
  cutting: 'Commencer la couture',
  sewing: 'Essayage',
  fitting: 'Envoyer en livraison',
  delivery: 'Marquer comme terminée',
}

export default function TailorOrderDetail() {
  const { id } = useParams()
  const { data: order, isLoading } = useOrder(id)
  const queryClient = useQueryClient()
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus()
  const [messages, setMessages] = useState([])

  const { sendMessage } = useOrderWebSocket(id, (data) => {
    if (data.message) setMessages((prev) => [...prev, data.message])
    if (data.type === 'status_update') {
      queryClient.invalidateQueries({ queryKey: ['orders', id] })
    }
  })

  if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  if (!order) return <p className="text-ivory/50 text-center py-20">Commande introuvable.</p>

  const nextStatus = NEXT_STATUS[order.status]
  const allMessages = [...(order.messages || []), ...messages]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-ivory">Commande de {order.client?.full_name}</h1>
          <p className="font-ui text-xs text-ivory/40 mt-1">#{order.id?.slice(0, 8)}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge status={order.status} />
          {nextStatus && (
            <Button
              size="sm"
              loading={isUpdating}
              onClick={() => updateStatus({ id: order.id, status: nextStatus })}
            >
              {NEXT_LABEL[order.status]}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="glass-card p-5 rounded-sm">
            <h3 className="font-display text-lg text-ivory mb-4">Détails</h3>
            <div className="space-y-3">
              <div>
                <p className="font-ui text-xs text-ivory/40 uppercase">Client</p>
                <p className="font-ui text-sm text-ivory">{order.client?.full_name}</p>
              </div>
              <div>
                <p className="font-ui text-xs text-ivory/40 uppercase mb-1">Description</p>
                <p className="font-ui text-xs text-ivory/70 leading-relaxed">{order.description}</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-5 rounded-sm">
            <h3 className="font-display text-lg text-ivory mb-4">Suivi</h3>
            <OrderStatusTimeline currentStatus={order.status} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-card rounded-sm h-[600px] flex flex-col">
            <div className="p-4 border-b border-gold/10">
              <h3 className="font-display text-lg text-ivory">Messages</h3>
            </div>
            <div className="flex-1 min-h-0">
              <MessageThread messages={allMessages} sendMessage={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
