import { useEffect, useRef, useCallback } from 'react'
import { useAuthStore } from '@/store/authStore'

export function useOrderWebSocket(orderId, onMessage) {
  const ws = useRef(null)
  const { accessToken } = useAuthStore()

  useEffect(() => {
    if (!orderId || !accessToken) return

    const wsBase = import.meta.env.VITE_WS_URL || `ws://${window.location.host}`
    const wsUrl = `${wsBase}/ws/orders/${orderId}/?token=${accessToken}`
    ws.current = new WebSocket(wsUrl)

    ws.current.onopen = () => {
      console.log('WS connected:', orderId)
    }

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage(data)
      } catch (e) {
        console.error('WS parse error:', e)
      }
    }

    ws.current.onerror = (error) => {
      console.error('WS error:', error)
    }

    ws.current.onclose = (event) => {
      console.log('WS closed:', event.code)
    }

    return () => {
      if (ws.current) {
        ws.current.close()
        ws.current = null
      }
    }
  }, [orderId, accessToken])

  const sendMessage = useCallback((data) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data))
    }
  }, [])

  return { sendMessage }
}
