import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useRegister } from '@/hooks/useAuth'
import clsx from 'clsx'

const SPECIALTIES = ['traditionnel', 'moderne', 'kabyle', 'soiree', 'mariage', 'casual', 'haute_couture', 'broderie']

export default function RegisterPage() {
  const [role, setRole] = useState('client')
  const { mutate: register, isPending } = useRegister()
  const [form, setForm] = useState({
    full_name: '', email: '', password: '', phone: '', wilaya: '', specialties: [],
  })
  const [errors, setErrors] = useState({})

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))
  const toggleSpecialty = (s) =>
    setForm((p) => ({
      ...p,
      specialties: p.specialties.includes(s)
        ? p.specialties.filter((x) => x !== s)
        : [...p.specialties, s],
    }))

  const handleSubmit = (e) => {
    e.preventDefault()
    register({ ...form, role })
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-ivory mb-2">
            <span className="text-gold-gradient">MT</span> Moda Creaz
          </h1>
          <p className="font-editorial italic text-ivory/50">Rejoignez-nous</p>
        </div>

        <div className="glass-card p-8 rounded-sm">
          <h2 className="font-display text-2xl text-ivory mb-6">Créer un compte</h2>

          {/* Role tabs */}
          <div className="flex rounded-sm overflow-hidden border border-slate-dark mb-6">
            {[
              { key: 'client', label: 'Cliente' },
              { key: 'tailor', label: 'Couturière' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={clsx(
                  'flex-1 py-2.5 font-ui text-xs tracking-widest uppercase transition-colors',
                  role === key
                    ? 'bg-gold text-obsidian font-semibold'
                    : 'text-ivory/50 hover:text-ivory'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nom complet" value={form.full_name} onChange={set('full_name')} required />
            <Input label="Email" type="email" value={form.email} onChange={set('email')} required />
            <Input label="Mot de passe" type="password" value={form.password} onChange={set('password')} required />

            {role === 'tailor' && (
              <>
                <Input label="Téléphone (WhatsApp)" type="tel" value={form.phone} onChange={set('phone')} placeholder="+213..." />
                <Input label="Wilaya" value={form.wilaya} onChange={set('wilaya')} placeholder="Ex: Alger" />
                <div>
                  <label className="font-ui text-xs tracking-widest uppercase text-ivory/60 block mb-2">Spécialités</label>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALTIES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSpecialty(s)}
                        className={clsx(
                          'px-3 py-1 text-xs font-ui tracking-wide border rounded-sm transition-colors',
                          form.specialties.includes(s)
                            ? 'bg-gold text-obsidian border-gold'
                            : 'border-slate-dark text-ivory/50 hover:border-gold/40'
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button type="submit" loading={isPending} className="w-full" size="lg">
              Créer mon compte
            </Button>
          </form>

          <div className="gold-line my-6" />
          <p className="text-center font-ui text-xs text-ivory/50">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-gold hover:text-gold-light transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
