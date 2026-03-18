import clsx from 'clsx'

const STYLES = [
  { key: 'traditionnel', label: 'Traditionnel' },
  { key: 'moderne', label: 'Moderne' },
  { key: 'kabyle', label: 'Kabyle' },
  { key: 'soiree', label: 'Soirée' },
  { key: 'mariage', label: 'Mariage' },
  { key: 'casual', label: 'Casual' },
  { key: 'boheme', label: 'Bohème' },
  { key: 'minimaliste', label: 'Minimaliste' },
]

export function StyleTagPicker({ selected = [], onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {STYLES.map(({ key, label }) => {
        const isSelected = selected.includes(key)
        return (
          <button
            key={key}
            type="button"
            onClick={() => onToggle(key)}
            className={clsx(
              'px-3 py-1.5 rounded-sm text-xs font-ui tracking-widest uppercase border transition-all duration-200',
              isSelected
                ? 'bg-gold text-obsidian border-gold font-semibold'
                : 'bg-transparent text-ivory/50 border-slate-dark hover:border-gold/50 hover:text-ivory/80'
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
