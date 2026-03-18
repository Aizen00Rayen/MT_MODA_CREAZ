import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationsService } from '@/services/notifications'
import { useAuthStore } from '@/store/authStore'

export const useNotifications = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated())
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationsService.list,
    enabled: isAuthenticated,
    refetchInterval: 30000,
  })
}

export const useUnreadCount = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated())
  return useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: notificationsService.unreadCount,
    enabled: isAuthenticated,
    refetchInterval: 30000,
  })
}

export const useMarkNotificationRead = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => notificationsService.markRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
