import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const steps = [
  {
    number: '01',
    title: 'Créez votre design',
    desc: 'Utilisez notre Studio IA pour visualiser votre tenue idéale avec GPT-4o et DALL-E.',
  },
  {
    number: '02',
    title: 'Choisissez votre couturière',
    desc: 'Parcourez les profils vérifiés, consultez les portfolios et les avis clients.',
  },
  {
    number: '03',
    title: 'Suivez en temps réel',
    desc: 'Échangez avec votre couturière et suivez chaque étape de création.',
  },
  {
    number: '04',
    title: 'Recevez votre création',
    desc: 'Votre tenue unique, faite à vos mesures, livrée à domicile.',
  },
]

export default function HowItWorksSection() {
  const { ref, className } = useScrollAnimation()

  return (
    <section className="py-24 bg-obsidian" ref={ref}>
      <div className={`max-w-7xl mx-auto px-6 ${className}`}>
        <div className="text-center mb-16">
          <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-3">Processus</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory">Comment ça marche</h2>
          <div className="gold-line w-24 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map(({ number, title, desc }, i) => (
            <div key={number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-gold/30 to-transparent z-0" />
              )}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-4 bg-gold/5">
                  <span className="font-display text-gold text-lg">{number}</span>
                </div>
                <h3 className="font-display text-xl text-ivory mb-2">{title}</h3>
                <p className="font-ui text-sm text-ivory/50 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
