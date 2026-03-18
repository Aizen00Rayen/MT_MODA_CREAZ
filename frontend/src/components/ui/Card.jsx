import clsx from 'clsx'

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={clsx(
        'glass-card rounded-sm',
        hover && 'transition-all duration-300 hover:border-gold/40 hover:shadow-gold cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
