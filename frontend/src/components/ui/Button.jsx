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
  ...props
}) {
  return (
    <button
      className={clsx(
        'font-ui tracking-widest uppercase transition-all duration-300 rounded-sm',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizes[size],
        variants[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Chargement...
        </span>
      ) : children}
    </button>
  )
}
