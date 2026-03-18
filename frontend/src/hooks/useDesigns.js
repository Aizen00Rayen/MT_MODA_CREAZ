import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { designsService } from '@/services/designs'
import toast from 'react-hot-toast'

export const useDesigns = (params) =>
  useQuery({
    queryKey: ['designs', params],
    queryFn: () => designsService.list(params),
  })

export const useGenerateDesign = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => designsService.generate(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['designs'] }),
    onError: (err) => {
      const msg = err.response?.data?.detail || 'Génération échouée. Réessayez.'
      toast.error(msg)
    },
  })
}

export const useToggleSaveDesign = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => designsService.toggleSave(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['designs'] }),
  })
}
