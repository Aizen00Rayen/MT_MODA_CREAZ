import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/services/api'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

export default function UserManagement() {
  const qc = useQueryClient()
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => api.get('/api/admin/users/').then((r) => r.data?.results || r.data),
  })
  const { mutate: ban } = useMutation({
    mutationFn: (id) => api.post(`/api/admin/users/${id}/ban/`).then((r) => r.data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['admin-users'] })
      toast.success(data.detail)
    },
  })

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Utilisateurs</h1>
      {isLoading ? <LoadingSpinner size="lg" /> : (
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="glass-card p-4 rounded-sm flex items-center justify-between">
              <div>
                <p className="font-ui text-sm text-ivory">{u.full_name}</p>
                <p className="font-ui text-xs text-ivory/40">{u.email} · {u.role}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge status={u.is_active ? 'completed' : 'cancelled'} label={u.is_active ? 'Actif' : 'Banni'} />
                {u.role !== 'admin' && (
                  <Button size="sm" variant={u.is_active ? 'danger' : 'primary'}
                    onClick={() => ban(u.id)}>
                    {u.is_active ? 'Bannir' : 'Réactiver'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
