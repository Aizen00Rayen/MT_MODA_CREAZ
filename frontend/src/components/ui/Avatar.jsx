import clsx from 'clsx'

export function Avatar({ src, name, size = 'md', className }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base', xl: 'w-20 h-20 text-xl' }
  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div className={clsx('rounded-full overflow-hidden flex-shrink-0', sizes[size], className)}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-ui font-semibold">
          {initials}
        </div>
      )}
    </div>
  )
}
