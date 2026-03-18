import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useToggleSaveDesign } from '@/hooks/useDesigns'
import clsx from 'clsx'

export function DesignCard({ design }) {
  const { mutate: toggleSave } = useToggleSaveDesign()

  return (
    <div className="group relative rounded-sm overflow-hidden border border-slate-dark hover:border-gold/40 transition-all duration-300 hover:shadow-gold">
      <img
        src={design.generated_image_url}
        alt={design.name || 'Design IA'}
        className="w-full aspect-square object-cover"
      />
      <div className="absolute inset-0 bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Save button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleSave(design.id) }}
        className="absolute top-3 right-3 p-2 bg-obsidian/60 rounded-full hover:bg-obsidian transition-colors"
      >
        {design.is_saved ? (
          <BookmarkCheck size={16} className="text-gold" />
        ) : (
          <Bookmark size={16} className="text-ivory/60 group-hover:text-gold" />
        )}
      </button>

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {design.color_palette?.length > 0 && (
          <div className="flex gap-1.5 mb-2">
            {design.color_palette.slice(0, 5).map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border border-white/20"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
        <p className="font-ui text-xs text-ivory/80 line-clamp-2">
          {design.prompt_text}
        </p>
      </div>
    </div>
  )
}
