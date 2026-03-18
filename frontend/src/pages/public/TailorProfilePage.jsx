import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Star, Award, Package, Calendar } from 'lucide-react'
import { useTailor } from '@/hooks/useTailors'
import { useCreateOrder } from '@/hooks/useOrders'
import { useAuthStore } from '@/store/authStore'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input, Textarea } from '@/components/ui/Input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

function OrderModal({ tailor, isOpen, onClose }) {
  const { mutate: createOrder, isPending } = useCreateOrder()
  const navigate = useNavigate()
  const [form, setForm] = useState({ description: '', delivery_date_estimated: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    createOrder(
      { tailor_id: tailor.user.id, ...form },
      { onSuccess: (order) => { onClose(); navigate(`/dashboard/client/orders/${order.id}`) } }
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouvelle commande" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="font-ui text-xs text-ivory/50">Couturière: <span className="text-ivory">{tailor.user.full_name}</span></p>
        <Textarea
          label="Description de votre projet"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={4}
          required
          placeholder="Décrivez votre tenue, tissu souhaité, occasions..."
        />
        <Input
          label="Date de livraison souhaitée"
          type="date"
          value={form.delivery_date_estimated}
          onChange={(e) => setForm((p) => ({ ...p, delivery_date_estimated: e.target.value }))}
        />
        <Button type="submit" loading={isPending} className="w-full">Envoyer la demande</Button>
      </form>
    </Modal>
  )
}

export default function TailorProfilePage() {
  const { id } = useParams()
  const { data: tailor, isLoading } = useTailor(id)
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [orderOpen, setOrderOpen] = useState(false)

  if (isLoading) return <div className="min-h-screen bg-obsidian flex items-center justify-center pt-16"><LoadingSpinner size="xl" /></div>
  if (!tailor) return <div className="min-h-screen bg-obsidian pt-24 text-center text-ivory/50">Couturière introuvable.</div>

  const handleOrder = () => {
    if (!user) { navigate('/login'); return }
    if (user.role !== 'client') { toast.error('Seuls les clients peuvent passer commande.'); return }
    setOrderOpen(true)
  }

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Cover */}
      <div className="relative h-64 bg-gradient-to-br from-charcoal to-slate-dark pt-16">
        {tailor.cover_photo && (
          <img src={tailor.cover_photo} alt="cover" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-dark-gradient opacity-70" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10 pb-16">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-obsidian overflow-hidden bg-charcoal flex-shrink-0">
            {tailor.profile_photo ? (
              <img src={tailor.profile_photo} alt={tailor.user.full_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gold font-display text-3xl">
                {tailor.user.full_name?.[0]}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h1 className="font-display text-3xl text-ivory">{tailor.user.full_name}</h1>
              {tailor.is_verified && (
                <div className="flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-sm px-2 py-0.5">
                  <Award size={12} className="text-gold" />
                  <span className="font-ui text-[10px] text-gold tracking-widest uppercase">Vérifié</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-ivory/50 text-sm font-ui mb-3">
              <MapPin size={13} />
              <span>{tailor.city}{tailor.city && tailor.wilaya ? ', ' : ''}{tailor.wilaya}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <StarRating value={Math.round(tailor.avg_rating)} size={14} />
                <span className="text-gold font-ui text-sm ml-1">{Number(tailor.avg_rating).toFixed(1)}</span>
              </div>
              <span className="text-ivory/40 text-xs font-ui">{tailor.total_orders} commandes</span>
              <span className="text-ivory/40 text-xs font-ui">{tailor.experience_years} ans d'expérience</span>
            </div>
          </div>
          <Button onClick={handleOrder} size="lg">Commander</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {tailor.bio && (
              <div>
                <h2 className="font-display text-xl text-ivory mb-3">À propos</h2>
                <p className="font-ui text-sm text-ivory/70 leading-relaxed">{tailor.bio}</p>
              </div>
            )}

            {/* Specialties */}
            {tailor.specialties?.length > 0 && (
              <div>
                <h2 className="font-display text-xl text-ivory mb-3">Spécialités</h2>
                <div className="flex flex-wrap gap-2">
                  {tailor.specialties.map((s) => <Badge key={s} status="gold" label={s} />)}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {tailor.portfolio?.length > 0 && (
              <div>
                <h2 className="font-display text-xl text-ivory mb-4">Portfolio</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {tailor.portfolio.map((item) => (
                    <div key={item.id} className="aspect-square rounded-sm overflow-hidden border border-slate-dark">
                      <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {tailor.recent_reviews?.length > 0 && (
              <div>
                <h2 className="font-display text-xl text-ivory mb-4">Avis clients</h2>
                <div className="space-y-4">
                  {tailor.recent_reviews.map((r) => (
                    <div key={r.id} className="glass-card p-4 rounded-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-ui text-xs text-gold">{r.client.full_name}</span>
                        <StarRating value={r.rating} size={12} />
                      </div>
                      {r.comment && <p className="font-ui text-xs text-ivory/60">{r.comment}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Pricing */}
            <div className="glass-card p-5 rounded-sm">
              <h3 className="font-display text-lg text-ivory mb-4">Tarifs</h3>
              {[
                { label: 'Base', value: tailor.price_base },
                { label: 'Standard', value: tailor.price_standard },
                { label: 'Premium', value: tailor.price_premium },
              ].filter((p) => p.value).map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-slate-dark last:border-0">
                  <span className="font-ui text-xs text-ivory/60 tracking-wide uppercase">{label}</span>
                  <span className="font-ui text-sm text-gold font-semibold">
                    {Number(value).toLocaleString()} DA
                  </span>
                </div>
              ))}
              <Button onClick={handleOrder} className="w-full mt-4" size="md">
                Commander maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>

      {tailor && <OrderModal tailor={tailor} isOpen={orderOpen} onClose={() => setOrderOpen(false)} />}
    </div>
  )
}
