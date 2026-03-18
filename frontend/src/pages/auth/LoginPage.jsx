import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLogin } from '@/hooks/useAuth'
import { useState } from 'react'

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    login(form)
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-ivory mb-2">
            <span className="text-gold-gradient">MT</span> Moda Creaz
          </h1>
          <p className="font-editorial italic text-ivory/50">Bienvenue</p>
        </div>

        <div className="glass-card p-8 rounded-sm">
          <h2 className="font-display text-2xl text-ivory mb-6">Connexion</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
              autoFocus
            />
            <Input
              label="Mot de passe"
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              required
            />
            <Button type="submit" loading={isPending} className="w-full" size="lg">
              Se connecter
            </Button>
          </form>

          <div className="gold-line my-6" />
          <p className="text-center font-ui text-xs text-ivory/50">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-gold hover:text-gold-light transition-colors">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
