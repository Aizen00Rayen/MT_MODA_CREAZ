import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { useAuthStore } from '@/store/authStore'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import clsx from 'clsx'

export function MessageThread({ messages = [], onSend, sendMessage }) {
  const [text, setText] = useState('')
  const endRef = useRef(null)
  const { user } = useAuthStore()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!text.trim()) return
    if (sendMessage) sendMessage({ type: 'message', content: text.trim() })
    if (onSend) onSend(text.trim())
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 p-4 min-h-0">
        {messages.length === 0 && (
          <p className="text-center text-ivory/30 font-ui text-xs py-8">Aucun message pour l'instant</p>
        )}
        {messages.map((msg) => {
          const isOwn = msg.sender?.id === user?.id || msg.sender_id === user?.id
          const senderName = msg.sender?.full_name || msg.sender_name || '?'
          return (
            <div key={msg.id} className={clsx('flex gap-2', isOwn && 'flex-row-reverse')}>
              <Avatar name={senderName} size="sm" />
              <div className={clsx('max-w-[70%]', isOwn && 'items-end flex flex-col')}>
                <div
                  className={clsx(
                    'rounded-sm px-3 py-2 text-sm font-ui',
                    isOwn ? 'bg-gold/20 text-ivory border border-gold/30' : 'bg-charcoal text-ivory border border-slate-dark'
                  )}
                >
                  {msg.content}
                </div>
                <span className="text-ivory/30 text-xs font-ui mt-1">
                  {format(new Date(msg.created_at), 'HH:mm', { locale: fr })}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      <div className="border-t border-slate-dark p-4 flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Votre message..."
          rows={2}
          className="flex-1 bg-charcoal border border-slate-dark rounded-sm px-3 py-2 text-ivory font-ui text-sm resize-none focus:border-gold focus:outline-none placeholder-ivory/30"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="px-4 bg-gold text-obsidian rounded-sm hover:bg-gold-light transition-colors disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
