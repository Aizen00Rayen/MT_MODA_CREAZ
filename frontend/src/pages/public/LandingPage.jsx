import HeroSection from '@/components/landing/HeroSection'
import StatsSection from '@/components/landing/StatsSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import TailorShowcaseSection from '@/components/landing/TailorShowcaseSection'
import AIStudioPreviewSection from '@/components/landing/AIStudioPreviewSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

function CTASection() {
  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ background: 'radial-gradient(ellipse at center, #C9A84C 0%, transparent 70%)' }}
      />
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-3">Commencez</p>
        <h2 className="font-display text-4xl md:text-5xl text-ivory mb-6">
          Votre création vous attend
        </h2>
        <p className="font-editorial italic text-xl text-ivory/60 mb-10">
          Rejoignez des milliers de clientes et couturières sur MT Moda Creaz.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="xl">Créer mon compte</Button>
          </Link>
          <Link to="/couturieres">
            <Button size="xl" variant="outline">Parcourir les couturières</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <TailorShowcaseSection />
      <AIStudioPreviewSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
