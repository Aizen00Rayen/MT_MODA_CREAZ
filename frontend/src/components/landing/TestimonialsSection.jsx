import { Star } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const testimonials = [
  {
    name: 'Yasmine B.',
    wilaya: 'Alger',
    text: 'J\'ai trouvé ma couturière en 5 minutes. Le suivi en temps réel est incroyable, je voyais chaque étape !',
    rating: 5,
  },
  {
    name: 'Fatima Z.',
    wilaya: 'Tizi Ouzou',
    text: 'Le Studio IA m\'a permis de visualiser ma robe de mariage avant même de rencontrer la couturière. Bluffant.',
    rating: 5,
  },
  {
    name: 'Nour K.',
    wilaya: 'Oran',
    text: 'Plateforme sérieuse, couturières vérifiées, communication fluide. Je recommande vivement.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const { ref, className } = useScrollAnimation()

  return (
    <section className="py-24 bg-charcoal" ref={ref}>
      <div className={`max-w-7xl mx-auto px-6 ${className}`}>
        <div className="text-center mb-16">
          <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-3">Témoignages</p>
          <h2 className="font-display text-4xl text-ivory">Ce qu'elles disent</h2>
          <div className="gold-line w-24 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, wilaya, text, rating }) => (
            <div key={name} className="glass-card p-6 rounded-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#C9A84C" stroke="#C9A84C" />
                ))}
              </div>
              <p className="font-editorial italic text-ivory/80 text-base mb-4 leading-relaxed">"{text}"</p>
              <div className="gold-line mb-3" />
              <p className="font-ui text-xs text-gold tracking-wide">{name}</p>
              <p className="font-ui text-xs text-ivory/40">{wilaya}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
