import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

export default function TailorVerification() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['admin-tailors'],
    queryFn: () => api.get('/api/tailors/').then((r) => r.data),
  })
  const { mutate: verify } = useMutation({
    mutationFn: (id) => api.post(`/api/admin/tailors/${id}/verify/`).then((r) => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-tailors'] }); toast.success('Statut mis à jour') },
  })

  const tailors = data?.results || data || []

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Vérification des couturières</h1>

      {isLoading ? <LoadingSpinner size="lg" /> : (
        <div className="space-y-3">
          {tailors.map((t) => (
            <div key={t.id} className="glass-card p-4 rounded-sm flex items-center justify-between">
              <div>
                <p className="font-ui text-sm text-ivory">{t.user?.full_name}</p>
                <p className="font-ui text-xs text-ivory/40">{t.wilaya} · {t.experience_years} ans exp.</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge status={t.is_verified ? 'completed' : 'pending'} label={t.is_verified ? 'Vérifié' : 'En attente'} />
                <Button size="sm" variant={t.is_verified ? 'danger' : 'primary'}
                  onClick={() => verify(t.id)}>
                  {t.is_verified ? 'Révoquer' : 'Vérifier'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
