import clsx from 'clsx'

const STATUS_COLORS = {
  pending: 'bg-yellow-900/40 text-yellow-400 border-yellow-700/40',
  confirmed: 'bg-blue-900/40 text-blue-400 border-blue-700/40',
  measuring: 'bg-purple-900/40 text-purple-400 border-purple-700/40',
  cutting: 'bg-indigo-900/40 text-indigo-400 border-indigo-700/40',
  sewing: 'bg-violet-900/40 text-violet-400 border-violet-700/40',
  fitting: 'bg-orange-900/40 text-orange-400 border-orange-700/40',
  delivery: 'bg-cyan-900/40 text-cyan-400 border-cyan-700/40',
  completed: 'bg-green-900/40 text-green-400 border-green-700/40',
  cancelled: 'bg-red-900/40 text-red-400 border-red-700/40',
  gold: 'bg-gold/10 text-gold border-gold/30',
  default: 'bg-slate-dark text-ivory/60 border-slate-dark',
}

const STATUS_LABELS = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  measuring: 'Prise de mesures',
  cutting: 'Découpe',
  sewing: 'Couture',
  fitting: 'Essayage',
  delivery: 'Livraison',
  completed: 'Terminée',
  cancelled: 'Annulée',
}

export function Badge({ status, label, className }) {
  const colorClass = STATUS_COLORS[status] || STATUS_COLORS.default
  const displayLabel = label || STATUS_LABELS[status] || status

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-ui tracking-widest uppercase border',
        colorClass,
        className
      )}
    >
      {displayLabel}
    </span>
  )
}
