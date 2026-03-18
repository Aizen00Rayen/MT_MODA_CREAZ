import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tailorsService } from '@/services/tailors'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { StyleTagPicker } from '@/components/design/StyleTagPicker'
import toast from 'react-hot-toast'

export default function TailorProfileEdit() {
  const qc = useQueryClient()
  const { data: profile } = useQuery({ queryKey: ['tailor-profile'], queryFn: tailorsService.getOwnProfile })
  const [form, setForm] = useState(null)

  if (profile && !form) {
    setForm({
      bio: profile.bio || '',
      city: profile.city || '',
      wilaya: profile.wilaya || '',
      experience_years: profile.experience_years || 0,
      specialties: profile.specialties || [],
      is_available: profile.is_available ?? true,
    })
  }

  const { mutate: update, isPending } = useMutation({
    mutationFn: tailorsService.updateProfile,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tailor-profile'] }); toast.success('Profil mis à jour') },
  })

  if (!form) return null

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Mon profil</h1>
      <div className="glass-card p-6 rounded-sm space-y-5">
        <Textarea label="Biographie" value={form.bio} onChange={set('bio')} rows={4} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Ville" value={form.city} onChange={set('city')} />
          <Input label="Wilaya" value={form.wilaya} onChange={set('wilaya')} />
        </div>
        <Input label="Années d'expérience" type="number" value={form.experience_years} onChange={set('experience_years')} />
        <div>
          <label className="font-ui text-xs tracking-widest uppercase text-ivory/60 block mb-2">Spécialités</label>
          <StyleTagPicker
            selected={form.specialties}
            onToggle={(s) => setForm((p) => ({
              ...p,
              specialties: p.specialties.includes(s) ? p.specialties.filter((x) => x !== s) : [...p.specialties, s],
            }))}
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="available" checked={form.is_available}
            onChange={(e) => setForm((p) => ({ ...p, is_available: e.target.checked }))}
            className="accent-gold" />
          <label htmlFor="available" className="font-ui text-xs text-ivory/70">Disponible pour de nouvelles commandes</label>
        </div>
        <Button loading={isPending} onClick={() => update(form)} className="w-full">Enregistrer</Button>
      </div>
    </div>
  )
}
