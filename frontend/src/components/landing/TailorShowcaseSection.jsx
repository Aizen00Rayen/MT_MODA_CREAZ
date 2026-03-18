import { Link } from 'react-router-dom'
import { useFeaturedTailors } from '@/hooks/useTailors'
import { TailorCard } from '@/components/tailor/TailorCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function TailorShowcaseSection() {
  const { data: tailors, isLoading } = useFeaturedTailors()
  const { ref, className } = useScrollAnimation()

  return (
    <section className="py-24 bg-charcoal" ref={ref}>
      <div className={`max-w-7xl mx-auto px-6 ${className}`}>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-3">Talent</p>
            <h2 className="font-display text-4xl text-ivory">Couturières vedettes</h2>
          </div>
          <Link to="/couturieres">
            <Button variant="outline" size="sm">Voir toutes</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : tailors?.results?.length > 0 || tailors?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(tailors?.results || tailors || []).slice(0, 6).map((t) => (
              <TailorCard key={t.id} tailor={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-ui text-sm text-ivory/40">Aucune couturière disponible pour l'instant.</p>
          </div>
        )}
      </div>
    </section>
  )
}
