import clsx from 'clsx'

export function Input({ label, error, className, id, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="font-ui text-xs tracking-widest uppercase text-ivory/60"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          'bg-charcoal border border-slate-dark rounded-sm px-4 py-3',
          'text-ivory placeholder-ivory/30 font-ui text-sm',
          'transition-all duration-200',
          'focus:outline-none focus:border-gold focus:shadow-gold',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-xs font-ui">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className, id, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="font-ui text-xs tracking-widest uppercase text-ivory/60">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={clsx(
          'bg-charcoal border border-slate-dark rounded-sm px-4 py-3',
          'text-ivory placeholder-ivory/30 font-ui text-sm resize-none',
          'transition-all duration-200',
          'focus:outline-none focus:border-gold focus:shadow-gold',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-xs font-ui">{error}</p>}
    </div>
  )
}
