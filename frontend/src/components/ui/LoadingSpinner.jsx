import clsx from 'clsx'

export function LoadingSpinner({ size = 'md', className }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  }

  return (
    <div
      className={clsx(
        'rounded-full border-gold/20 border-t-gold animate-spin',
        sizes[size],
        className
      )}
    />
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" />
        <p className="font-ui text-xs tracking-widest uppercase text-ivory/40">Chargement...</p>
      </div>
    </div>
  )
}
