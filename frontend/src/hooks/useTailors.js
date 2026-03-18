import { useQuery } from '@tanstack/react-query'
import { tailorsService } from '@/services/tailors'

export const useTailors = (filters) =>
  useQuery({
    queryKey: ['tailors', filters],
    queryFn: () => tailorsService.list(filters),
  })

export const useTailor = (id) =>
  useQuery({
    queryKey: ['tailors', id],
    queryFn: () => tailorsService.getById(id),
    enabled: !!id,
  })

export const useFeaturedTailors = () =>
  useQuery({
    queryKey: ['tailors', 'featured'],
    queryFn: tailorsService.featured,
  })
