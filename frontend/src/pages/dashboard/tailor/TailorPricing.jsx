import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tailorsService } from '@/services/tailors'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function TailorPricing() {
  const qc = useQueryClient()
  const { data: profile } = useQuery({ queryKey: ['tailor-profile'], queryFn: tailorsService.getOwnProfile })
  const [prices, setPrices] = useState({ price_base: '', price_standard: '', price_premium: '' })
  const [loaded, setLoaded] = useState(false)

  if (profile && !loaded) {
    setPrices({ price_base: profile.price_base || '', price_standard: profile.price_standard || '', price_premium: profile.price_premium || '' })
    setLoaded(true)
  }

  const { mutate: update, isPending } = useMutation({
    mutationFn: tailorsService.updateProfile,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tailor-profile'] }); toast.success('Tarifs mis à jour') },
  })

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Mes tarifs</h1>
      <div className="glass-card p-6 rounded-sm space-y-4">
        <p className="font-ui text-xs text-ivory/50">
          Définissez vos tarifs pour chaque niveau de prestation (en DA).
        </p>
        <Input label="Base (simple)" type="number" value={prices.price_base}
          onChange={(e) => setPrices((p) => ({ ...p, price_base: e.target.value }))}
          placeholder="Ex: 15000" />
        <Input label="Standard" type="number" value={prices.price_standard}
          onChange={(e) => setPrices((p) => ({ ...p, price_standard: e.target.value }))}
          placeholder="Ex: 30000" />
        <Input label="Premium (haute couture)" type="number" value={prices.price_premium}
          onChange={(e) => setPrices((p) => ({ ...p, price_premium: e.target.value }))}
          placeholder="Ex: 60000" />
        <Button loading={isPending} onClick={() => update(prices)} className="w-full">Enregistrer</Button>
      </div>
    </div>
  )
}
