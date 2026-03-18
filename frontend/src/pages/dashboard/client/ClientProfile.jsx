import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function ClientProfile() {
  const { user, updateUser } = useAuthStore()
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    wilaya: user?.wilaya || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const updated = await authService.updateProfile(form)
      updateUser(updated)
      toast.success('Profil mis à jour')
    } catch {
      toast.error('Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Mon profil</h1>
      <div className="glass-card p-6 rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nom complet" value={form.full_name} onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))} />
          <div>
            <label className="font-ui text-xs tracking-widest uppercase text-ivory/40 block mb-1">Email</label>
            <p className="font-ui text-sm text-ivory/60 bg-obsidian border border-slate-dark rounded-sm px-4 py-3">{user?.email}</p>
          </div>
          <Input label="Téléphone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
          <Input label="Wilaya" value={form.wilaya} onChange={(e) => setForm((p) => ({ ...p, wilaya: e.target.value }))} />
          <Button type="submit" loading={loading} className="w-full">Enregistrer</Button>
        </form>
      </div>
    </div>
  )
}
