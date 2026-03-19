import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import SewingBackground from './SewingBackground'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-dark-gradient" />

      {/* Sewing animation (needles, threads, fabric) */}
      <SewingBackground />

      {/* Radial vignette to keep center readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, rgba(10,10,10,0.55) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-8">
            Haute Couture Algérienne
          </p>

          {/* Logo — mix-blend-mode:screen removes the black background on the dark page */}
          <motion.div
            className="flex justify-center mb-2"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="relative">
              {/* Soft gold ambient glow behind logo */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: 'rgba(201,168,76,0.08)', transform: 'scale(1.3)' }}
              />
              <img
                src="/logo.jpeg"
                alt="MT Moda Creaz"
                className="relative h-52 md:h-72 object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
          </motion.div>

          {/* Decorative gold stitch line */}
          <motion.div
            className="flex items-center gap-3 justify-center my-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(201,168,76,0.6) 0px, rgba(201,168,76,0.6) 8px, transparent 8px, transparent 16px)',
              }}
            />
            <span className="text-gold/50 text-xs">✦</span>
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(201,168,76,0.6) 0px, rgba(201,168,76,0.6) 8px, transparent 8px, transparent 16px)',
              }}
            />
          </motion.div>

          {/* Tagline */}
          <p className="font-editorial italic text-xl md:text-2xl text-ivory/55 mb-10">
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
