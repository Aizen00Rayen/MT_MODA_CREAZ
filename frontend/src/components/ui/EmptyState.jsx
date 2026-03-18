export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
          <Icon size={28} className="text-gold/60" />
        </div>
      )}
      <div className="gold-line w-12 mb-4" />
      <h3 className="font-display text-xl text-ivory mb-2">{title}</h3>
      {description && (
        <p className="font-ui text-sm text-ivory/50 max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  )
}
