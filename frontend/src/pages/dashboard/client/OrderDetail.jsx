import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useOrder } from '@/hooks/useOrders'
import { useOrderWebSocket } from '@/hooks/useWebSocket'
import { OrderStatusTimeline } from '@/components/order/OrderStatusTimeline'
import { MessageThread } from '@/components/order/MessageThread'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { Modal } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { reviewsService } from '@/services/reviews'
import toast from 'react-hot-toast'

function ReviewModal({ order, isOpen, onClose }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await reviewsService.create({ order: order.id, rating, comment })
      toast.success('Avis envoyé. Merci !')
      onClose()
    } catch {
      toast.error('Erreur lors de l\'envoi de l\'avis.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Laisser un avis">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-ui text-xs tracking-widest uppercase text-ivory/60 block mb-2">Note</label>
          <StarRating value={rating} onChange={setRating} size={28} />
        </div>
        <Textarea label="Commentaire (optionnel)" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
        <Button type="submit" loading={loading} className="w-full">Envoyer mon avis</Button>
      </form>
    </Modal>
  )
}

export default function OrderDetail() {
  const { id } = useParams()
  const { data: order, isLoading } = useOrder(id)
  const queryClient = useQueryClient()
  const [reviewOpen, setReviewOpen] = useState(false)
  const [messages, setMessages] = useState([])

  const { sendMessage } = useOrderWebSocket(id, (data) => {
    if (data.type === 'chat_message' || data.message) {
      setMessages((prev) => [...prev, data.message || data])
      queryClient.invalidateQueries({ queryKey: ['orders', id] })
    }
    if (data.type === 'status_update') {
      queryClient.invalidateQueries({ queryKey: ['orders', id] })
      toast.success(`Statut: ${data.status}`)
    }
  })

  if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
  if (!order) return <p className="text-ivory/50 text-center py-20">Commande introuvable.</p>

  const allMessages = [...(order.messages || []), ...messages]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-ivory">Commande</h1>
          <p className="font-ui text-xs text-ivory/40 mt-1">#{order.id?.slice(0, 8)}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge status={order.status} />
          {order.status === 'completed' && !order.review && (
            <Button size="sm" onClick={() => setReviewOpen(true)}>Laisser un avis</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Order info + design */}
        <div className="space-y-4">
          <div className="glass-card p-5 rounded-sm">
            <h3 className="font-display text-lg text-ivory mb-4">Détails</h3>
            <div className="space-y-3">
              <div>
                <p className="font-ui text-xs text-ivory/40 uppercase tracking-wide">Couturière</p>
                <p className="font-ui text-sm text-ivory">{order.tailor?.full_name}</p>
              </div>
              {order.price_agreed && (
                <div>
                  <p className="font-ui text-xs text-ivory/40 uppercase tracking-wide">Prix convenu</p>
                  <p className="font-ui text-sm text-gold font-semibold">
                    {Number(order.price_agreed).toLocaleString()} DA
                  </p>
                </div>
              )}
              {order.delivery_date_estimated && (
                <div>
                  <p className="font-ui text-xs text-ivory/40 uppercase tracking-wide">Livraison estimée</p>
                  <p className="font-ui text-sm text-ivory">
                    {new Date(order.delivery_date_estimated).toLocaleDateString('fr-DZ')}
                  </p>
                </div>
              )}
              <div>
                <p className="font-ui text-xs text-ivory/40 uppercase tracking-wide mb-1">Description</p>
                <p className="font-ui text-xs text-ivory/70 leading-relaxed">{order.description}</p>
              </div>
            </div>
          </div>

          {order.design_image && (
            <div className="glass-card p-3 rounded-sm">
              <p className="font-ui text-xs text-ivory/40 uppercase tracking-wide mb-2">Design de référence</p>
              <img src={order.design_image} alt="design" className="w-full rounded-sm" />
            </div>
          )}

          {/* Timeline */}
          <div className="glass-card p-5 rounded-sm">
            <h3 className="font-display text-lg text-ivory mb-4">Suivi</h3>
            <OrderStatusTimeline currentStatus={order.status} />
          </div>
        </div>

        {/* Column 2: Messages */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-sm h-[600px] flex flex-col">
            <div className="p-4 border-b border-gold/10">
              <h3 className="font-display text-lg text-ivory">Messages</h3>
            </div>
            <div className="flex-1 min-h-0">
              <MessageThread
                messages={allMessages}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>

      <ReviewModal order={order} isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />
    </div>
  )
}
