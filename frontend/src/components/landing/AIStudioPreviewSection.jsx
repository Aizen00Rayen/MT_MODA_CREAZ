import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function AIStudioPreviewSection() {
  const { ref, className } = useScrollAnimation()

  return (
    <section className="py-24 bg-obsidian" ref={ref}>
      <div className={`max-w-7xl mx-auto px-6 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-3">Intelligence Artificielle</p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory mb-6">
              Studio IA<br />
              <span className="font-editorial italic text-gold">pour la mode</span>
            </h2>
            <p className="font-ui text-sm text-ivory/60 leading-relaxed mb-8">
              Décrivez votre tenue idéale en quelques mots. Notre IA, entraînée sur la haute couture algérienne,
              génère une visualisation HD en moins de 30 secondes. Partagez-la avec votre couturière pour
              une réalisation parfaite.
            </p>
            <div className="space-y-3 mb-8">
              {[
                'Génération HD via DALL-E 3',
                'Palette de couleurs automatique',
                'Partage direct avec les couturières',
                'Sauvegarde de vos créations',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-ui text-sm text-ivory/70">{feature}</span>
                </div>
              ))}
            </div>
            <Link to="/studio">
              <Button size="lg" className="flex items-center gap-2">
                <Sparkles size={16} />
                Essayer gratuitement
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          {/* Preview card */}
          <div className="glass-card p-8 rounded-sm">
            <div className="bg-obsidian rounded-sm p-4 mb-4 border border-slate-dark">
              <p className="font-ui text-xs text-ivory/40 mb-2 tracking-wide">Prompt exemple</p>
              <p className="font-editorial italic text-ivory text-sm">
                "Robe de soirée kabyle moderne, broderies dorées sur velours noir, manches larges..."
              </p>
            </div>

            {/* Fake generated image placeholder */}
            <div className="aspect-square bg-gradient-to-br from-charcoal via-slate-dark to-charcoal rounded-sm flex items-center justify-center border border-gold/10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20"
                style={{ background: 'radial-gradient(circle at 30% 70%, #C9A84C22, transparent 50%), radial-gradient(circle at 70% 30%, #1A1A1A, transparent 50%)' }}
              />
              <div className="text-center relative z-10">
                <Sparkles size={40} className="text-gold/40 mx-auto mb-3" />
                <p className="font-ui text-xs text-ivory/30 tracking-widest uppercase">Votre design ici</p>
              </div>
            </div>

            {/* Color palette */}
            <div className="flex gap-2 mt-4">
              {['#C9A84C', '#0A0A0A', '#1A1A1A', '#FAFAFA', '#A8852A'].map((c) => (
                <div key={c} className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: c }} />
              ))}
              <span className="font-ui text-xs text-ivory/40 self-center ml-2">Palette générée</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
