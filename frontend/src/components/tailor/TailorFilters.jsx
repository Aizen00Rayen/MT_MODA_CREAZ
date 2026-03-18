import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const WILAYAS = [
  'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Sétif', 'Tlemcen',
  'Béjaïa', 'Tizi Ouzou', 'Médéa', 'Mostaganem', 'Boumerdès', 'Tipaza',
]

const SPECIALTIES = [
  'traditionnel', 'moderne', 'kabyle', 'soiree', 'mariage',
  'casual', 'boheme', 'minimaliste', 'haute_couture', 'broderie',
]

export function TailorFilters({ filters, onChange }) {
  const [local, setLocal] = useState(filters || {})

  const apply = () => onChange(local)
  const reset = () => { setLocal({}); onChange({}) }

  const set = (key, value) => setLocal((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="space-y-6">
      <div>
        <label className="font-ui text-xs tracking-widest uppercase text-ivory/60 block mb-2">Wilaya</label>
        <select
          value={local.wilaya || ''}
          onChange={(e) => set('wilaya', e.target.value)}
          className="w-full bg-charcoal border border-slate-dark text-ivory font-ui text-sm px-3 py-2 rounded-sm focus:border-gold focus:outline-none"
        >
          <option value="">Toutes les wilayas</option>
          {WILAYAS.map((w) => (
            <option key={w} value={w.toLowerCase()}>{w}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-ui text-xs tracking-widest uppercase text-ivory/60 block mb-2">Spécialité</label>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              onClick={() => set('specialty', local.specialty === s ? '' : s)}
              className={`px-3 py-1 rounded-sm text-xs font-ui tracking-wide border transition-colors ${
                local.specialty === s
                  ? 'bg-gold text-obsidian border-gold'
                  : 'border-slate-dark text-ivory/50 hover:border-gold/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-ui text-xs tracking-widest uppercase text-ivory/60 block mb-2">Note minimum</label>
        <input
          type="range" min="0" max="5" step="0.5"
          value={local.min_rating || 0}
          onChange={(e) => set('min_rating', e.target.value)}
          className="w-full accent-gold"
        />
        <span className="text-gold text-xs font-ui">{local.min_rating || 0}★</span>
      </div>

      <div>
        <Input
          label="Prix maximum (DA)"
          type="number"
          value={local.max_price || ''}
          onChange={(e) => set('max_price', e.target.value)}
          placeholder="Ex: 50000"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="available"
          checked={!!local.is_available}
          onChange={(e) => set('is_available', e.target.checked || undefined)}
          className="accent-gold"
        />
        <label htmlFor="available" className="font-ui text-xs text-ivory/70">Disponible seulement</label>
      </div>

      <div className="flex gap-2">
        <Button variant="primary" size="sm" onClick={apply} className="flex-1">Filtrer</Button>
        <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>
      </div>
    </div>
  )
}
