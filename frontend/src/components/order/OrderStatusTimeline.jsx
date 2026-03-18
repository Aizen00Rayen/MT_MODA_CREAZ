import { Check } from 'lucide-react'
import clsx from 'clsx'

const STEPS = [
  { key: 'confirmed', label: 'Confirmée' },
  { key: 'measuring', label: 'Prise de mesures' },
  { key: 'cutting', label: 'Découpe' },
  { key: 'sewing', label: 'Couture' },
  { key: 'fitting', label: 'Essayage' },
  { key: 'delivery', label: 'Livraison' },
  { key: 'completed', label: 'Terminée' },
]

const ORDER_KEYS = STEPS.map((s) => s.key)

export function OrderStatusTimeline({ currentStatus }) {
  const currentIndex = ORDER_KEYS.indexOf(currentStatus)
  const isCancelled = currentStatus === 'cancelled'

  if (isCancelled) {
    return (
      <div className="p-4 border border-red-700/40 rounded-sm bg-red-900/10">
        <p className="text-red-400 font-ui text-sm tracking-wide">Cette commande a été annulée.</p>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {STEPS.map((step, index) => {
        const isDone = index < currentIndex
        const isActive = index === currentIndex
        const isPending = index > currentIndex

        return (
          <div key={step.key} className="flex gap-4">
            {/* Indicator column */}
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all duration-300',
                  isDone && 'bg-gold border-gold',
                  isActive && 'bg-transparent border-gold shadow-gold animate-pulse-gold',
                  isPending && 'bg-transparent border-slate-dark'
                )}
              >
                {isDone ? (
                  <Check size={14} className="text-obsidian" />
                ) : (
                  <div className={clsx('w-2 h-2 rounded-full', isActive ? 'bg-gold' : 'bg-slate-dark')} />
                )}
              </div>
              {index < STEPS.length - 1 && (
                <div className={clsx('w-0.5 flex-1 min-h-[24px] my-1', isDone ? 'bg-gold' : 'bg-slate-dark')} />
              )}
            </div>

            {/* Label */}
            <div className="pb-6 pt-1">
              <span
                className={clsx(
                  'font-ui text-sm tracking-wide',
                  isDone && 'text-gold',
                  isActive && 'text-ivory font-semibold',
                  isPending && 'text-ivory/30'
                )}
              >
                {step.label}
              </span>
              {isActive && (
                <span className="block text-xs text-gold/60 font-ui mt-0.5">En cours...</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
