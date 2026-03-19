import { Link } from 'react-router-dom'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-block mb-3">
              <Logo className="h-14" />
            </Link>
            <p className="font-ui text-xs text-ivory/50 leading-relaxed">
              La plateforme de haute couture algérienne. Connectons créateurs et clients.
            </p>
          </div>
          <div>
            <h4 className="font-ui text-xs tracking-widest uppercase text-gold mb-4">Plateforme</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/couturieres', label: 'Couturières' },
                { to: '/studio', label: 'Studio IA' },
                { to: '/register', label: 'Devenir couturière' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="font-ui text-xs text-ivory/50 hover:text-gold transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-ui text-xs tracking-widest uppercase text-gold mb-4">Wilayas</h4>
            <p className="font-ui text-xs text-ivory/50">
              Présents dans toutes les 69 wilayas d'Algérie.
            </p>
          </div>
        </div>
        <div className="stitch-line mb-6" />
        <p className="font-ui text-xs text-ivory/30 text-center tracking-wide">
          © 2024 MT Moda Creaz — Haute couture algérienne
        </p>
      </div>
    </footer>
  )
}
