import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scissors } from 'lucide-react'
import clsx from 'clsx'

const variants = {
  primary: 'bg-gold-gradient text-obsidian font-semibold hover:shadow-gold hover:scale-[1.02]',
  outline: 'border border-gold text-gold hover:bg-gold hover:text-obsidian',
  ghost: 'text-gold hover:bg-gold/10',
  danger: 'bg-red-900/80 text-ivory hover:bg-red-800 border border-red-700',
  dark: 'bg-charcoal text-ivory border border-slate-dark hover:border-gold/40',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
  xl: 'px-10 py-5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  disabled,
  onClick,
  ...props
}) {
  const [cutting, setCutting] = useState(false)

  const handleClick = (e) => {
    if (cutting || disabled || loading) return
    setCutting(true)
    setTimeout(() => setCutting(false), 420)
    onClick?.(e)
  }

  return (
    <button
      className={clsx(
        'font-ui tracking-widest uppercase transition-all duration-300 rounded-sm',
        'relative overflow-hidden',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizes[size],
        variants[variant],
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {/* Content — splits slightly as scissors cuts through */}
      <motion.span
        className="relative block"
        animate={cutting ? { y: -2 } : { y: 0 }}
        transition={{ duration: 0.22, delay: 0.1 }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Chargement...
          </span>
        ) : (
          children
        )}
      </motion.span>

      {/* Scissors + cut-line overlay */}
      <AnimatePresence>
        {cutting && (
          <motion.div
            key="cut"
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {/* Growing cut line */}
            <motion.div
              className="absolute top-1/2 left-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, rgba(201,168,76,0.9), rgba(232,201,122,0.5))',
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0, width: '100%' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.38, ease: 'linear' }}
            />

            {/* Scissors icon sliding left → right */}
            <motion.div
              className="absolute top-1/2 flex items-center justify-center text-gold drop-shadow-sm"
              style={{ translateY: '-50%' }}
              initial={{ left: '-2rem' }}
              animate={{ left: 'calc(100% + 2rem)' }}
              transition={{ duration: 0.38, ease: 'easeInOut' }}
            >
              <Scissors
                size={15}
                strokeWidth={1.8}
                style={{ transform: 'rotate(-90deg)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
