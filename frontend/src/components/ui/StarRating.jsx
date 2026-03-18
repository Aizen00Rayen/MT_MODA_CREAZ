import { Star } from 'lucide-react'
import clsx from 'clsx'

export function StarRating({ value = 0, onChange, size = 16, className }) {
  const interactive = !!onChange

  return (
    <div className={clsx('flex gap-1', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onChange(star) : undefined}
          className={clsx(
            'transition-colors',
            interactive && 'cursor-pointer hover:scale-110',
            !interactive && 'cursor-default'
          )}
        >
          <Star
            size={size}
            fill={star <= value ? '#C9A84C' : 'transparent'}
            stroke={star <= value ? '#C9A84C' : '#C9A84C60'}
          />
        </button>
      ))}
    </div>
  )
}
