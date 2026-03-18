import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className={`relative w-full ${sizes[size]} bg-charcoal border border-gold/20 rounded-sm shadow-gold z-10`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gold/10">
              {title && (
                <h2 className="font-display text-xl text-ivory">{title}</h2>
              )}
              <button
                onClick={onClose}
                className="ml-auto p-1 text-ivory/40 hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
