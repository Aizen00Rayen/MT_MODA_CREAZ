import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersService } from '@/services/orders'
import toast from 'react-hot-toast'

export const useOrders = (params) =>
  useQuery({
    queryKey: ['orders', params],
    queryFn: () => ordersService.list(params),
  })

export const useOrder = (id) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  })

export const useCreateOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ordersService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Commande envoyée !')
    },
    onError: () => toast.error('Erreur lors de la commande'),
  })
}

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }) => ordersService.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['orders', id] })
      qc.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Statut mis à jour')
    },
    onError: (err) => {
      const msg = err.response?.data?.[0] || 'Erreur de mise à jour'
      toast.error(msg)
    },
  })
}
