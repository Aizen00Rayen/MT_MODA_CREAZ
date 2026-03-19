import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Scissors, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDemoLogin } from '@/hooks/useAuth'
import clsx from 'clsx'

const ROLES = [
  {
    key: 'client',
    label: 'Cliente',
    description: 'Parcourez les couturières, générez des designs IA et passez des commandes.',
    icon: User,
    color: 'hover:border-gold/60',
    badge: 'client@demo.mt',
  },
  {
    key: 'tailor',
    label: 'Couturière',
    description: 'Gérez vos commandes, votre portfolio et vos tarifs.',
    icon: Scissors,
    color: 'hover:border-gold/60',
    badge: 'tailor@demo.mt',
  },
  {
    key: 'admin',
    label: 'Admin',
    description: 'Supervisez la plateforme, vérifiez les couturières et gérez les utilisateurs.',
    icon: Shield,
    color: 'hover:border-gold/60',
    badge: 'admin@demo.mt',
  },
]

export default function LoginPage() {
  const demoLogin = useDemoLogin()
  const [loading, setLoading] = useState(null)

  const handleDemo = (role) => {
    setLoading(role)
    setTimeout(() => {
      demoLogin(role)
      setLoading(null)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-ivory mb-2">
            <span className="text-gold-gradient">MT</span> Moda Creaz
          </h1>
          <p className="font-editorial italic text-ivory/50">Mode algérienne haute couture</p>
        </div>

        <div className="glass-card p-8 rounded-sm">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl text-ivory mb-2">Accès démo</h2>
            <p className="font-ui text-xs text-ivory/40 tracking-wide">
              Choisissez un rôle pour explorer la plateforme
            </p>
          </div>

          <div className="space-y-3">
            {ROLES.map(({ key, label, description, icon: Icon, color, badge }) => (
              <button
                key={key}
                onClick={() => handleDemo(key)}
                disabled={loading !== null}
                className={clsx(
                  'w-full text-left p-4 rounded-sm border border-slate-dark transition-all duration-200 group',
                  color,
                  loading === key ? 'border-gold bg-gold/5' : 'hover:bg-white/[0.02]'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    'w-10 h-10 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors',
                    loading === key ? 'border-gold bg-gold/10' : 'border-slate-dark group-hover:border-gold/40'
                  )}>
                    {loading === key ? (
                      <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Icon size={16} className="text-gold/60 group-hover:text-gold transition-colors" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-ui text-sm font-semibold text-ivory tracking-wide">{label}</span>
                      <span className="font-ui text-[10px] text-ivory/30 tracking-wider">{badge}</span>
                    </div>
                    <p className="font-ui text-xs text-ivory/40 leading-relaxed">{description}</p>
                  </div>
                  <span className="text-gold/30 group-hover:text-gold/70 transition-colors text-lg flex-shrink-0">→</span>
                </div>
              </button>
            ))}
          </div>

          <div className="gold-line my-6" />

          <p className="text-center font-ui text-xs text-ivory/30 leading-relaxed">
            Plateforme en mode démonstration.{' '}
            <Link to="/register" className="text-gold/60 hover:text-gold transition-colors">
              Créer un vrai compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
