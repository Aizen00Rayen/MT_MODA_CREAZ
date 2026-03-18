import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-gradient" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating gold orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-6">
            Haute Couture Algérienne
          </p>

          {/* Main title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-ivory mb-4 leading-none">
            <span className="text-gold-gradient">MT</span>
            <br />
            <span className="font-editorial italic font-light">Moda Creaz</span>
          </h1>

          {/* Tagline */}
          <p className="font-editorial italic text-xl md:text-2xl text-ivory/60 mb-10 mt-6">
            L'haute couture algérienne, réinventée.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/couturieres">
              <Button size="lg" variant="primary" className="flex items-center gap-2">
                <Users size={16} />
                Trouver une couturière
              </Button>
            </Link>
            <Link to="/studio">
              <Button size="lg" variant="outline" className="flex items-center gap-2">
                <Sparkles size={16} />
                Studio IA
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 md:gap-16 justify-center">
            {[
              { value: '500+', label: 'Couturières' },
              { value: '10 000+', label: 'Créations' },
              { value: '48', label: 'Wilayas' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl md:text-3xl text-gold-gradient">{value}</p>
                <p className="font-ui text-xs text-ivory/40 tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/40" />
        <div className="w-1 h-1 rounded-full bg-gold/40" />
      </motion.div>
    </section>
  )
}
