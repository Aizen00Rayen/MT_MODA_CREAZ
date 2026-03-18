import { useState } from 'react'
import { Filter } from 'lucide-react'
import { useTailors } from '@/hooks/useTailors'
import { TailorCard } from '@/components/tailor/TailorCard'
import { TailorFilters } from '@/components/tailor/TailorFilters'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'

export default function TailorDirectoryPage() {
  const [filters, setFilters] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState(1)

  const { data, isLoading } = useTailors({ ...filters, page })
  const tailors = data?.results || data || []
  const count = data?.count || tailors.length

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-2">Annuaire</p>
          <div className="flex items-end justify-between">
            <h1 className="font-display text-4xl md:text-5xl text-ivory">
              Nos couturières
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 font-ui text-xs tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors border border-slate-dark rounded-sm px-4 py-2"
            >
              <Filter size={14} />
              Filtres
            </button>
          </div>
          {count > 0 && (
            <p className="font-ui text-sm text-ivory/40 mt-2">{count} couturière{count > 1 ? 's' : ''}</p>
          )}
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          {sidebarOpen && (
            <aside className="w-72 flex-shrink-0">
              <div className="glass-card p-6 rounded-sm sticky top-24">
                <h3 className="font-ui text-xs tracking-widest uppercase text-gold mb-6">Filtres</h3>
                <TailorFilters
                  filters={filters}
                  onChange={(f) => { setFilters(f); setPage(1) }}
                />
              </div>
            </aside>
          )}

          {/* Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : tailors.length === 0 ? (
              <EmptyState
                title="Aucune couturière trouvée"
                description="Essayez de modifier vos filtres."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tailors.map((t) => (
                  <TailorCard key={t.id} tailor={t} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {data?.next && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setPage(page + 1)}
                  className="font-ui text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-all rounded-sm"
                >
                  Charger plus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
