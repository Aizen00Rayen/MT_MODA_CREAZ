import { useQuery } from '@tanstack/react-query'
import { reviewsService } from '@/services/reviews'
import { StarRating } from '@/components/ui/StarRating'
import { EmptyState } from '@/components/ui/EmptyState'
import { Star } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function TailorReviews() {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['my-reviews'],
    queryFn: reviewsService.getMine,
  })

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <h1 className="font-display text-3xl text-ivory">Mes avis</h1>
        {avg && (
          <div className="flex items-center gap-2">
            <span className="font-display text-3xl text-gold">{avg}</span>
            <Star size={20} fill="#C9A84C" stroke="#C9A84C" />
            <span className="font-ui text-xs text-ivory/40">/ 5</span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : reviews.length === 0 ? (
        <EmptyState icon={Star} title="Aucun avis" description="Les avis de vos clients apparaîtront ici." />
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="glass-card p-5 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-ui text-sm text-ivory">{r.client?.full_name}</span>
                <StarRating value={r.rating} size={14} />
              </div>
              {r.comment && <p className="font-ui text-sm text-ivory/60">{r.comment}</p>}
              <p className="font-ui text-xs text-ivory/30 mt-2">{new Date(r.created_at).toLocaleDateString('fr-DZ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
