import { Sparkles } from 'lucide-react'
import { useDesigns } from '@/hooks/useDesigns'
import { DesignCard } from '@/components/design/DesignCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function SavedDesigns() {
  const { data: allData, isLoading } = useDesigns()
  const designs = allData?.results || allData || []

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-ivory">Mes designs</h1>
        <Link to="/studio"><Button size="sm" className="flex items-center gap-2"><Sparkles size={14} />Nouveau design</Button></Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : designs.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Aucun design"
          description="Créez votre premier design avec notre Studio IA."
          action={<Link to="/studio"><Button>Ouvrir le Studio IA</Button></Link>}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map((d) => <DesignCard key={d.id} design={d} />)}
        </div>
      )}
    </div>
  )
}
