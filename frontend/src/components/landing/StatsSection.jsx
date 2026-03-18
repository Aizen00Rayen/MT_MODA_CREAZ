import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const stats = [
  { value: '500+', label: 'Couturières actives', desc: 'Dans toute l\'Algérie' },
  { value: '10K+', label: 'Créations réalisées', desc: 'Et des milliers à venir' },
  { value: '48', label: 'Wilayas couvertes', desc: 'De Alger à Tamanrasset' },
  { value: '4.8★', label: 'Note moyenne', desc: 'Satisfaction garantie' },
]

export default function StatsSection() {
  const { ref, className } = useScrollAnimation()

  return (
    <section className="py-20 bg-charcoal border-y border-gold/10" ref={ref}>
      <div className={`max-w-7xl mx-auto px-6 ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, desc }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl md:text-5xl text-gold-gradient mb-2">{value}</p>
              <p className="font-ui text-sm text-ivory tracking-wide mb-1">{label}</p>
              <p className="font-ui text-xs text-ivory/40">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
