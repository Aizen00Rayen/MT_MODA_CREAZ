import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="font-display text-4xl text-ivory mb-2">
          <span className="text-gold-gradient">MT</span> Moda Creaz
        </h1>
        <p className="font-editorial italic text-ivory/50 mb-10">Mode algérienne haute couture</p>

        <div className="glass-card p-8 rounded-sm">
          <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✦</span>
          </div>
          <h2 className="font-display text-2xl text-ivory mb-3">Plateforme démo</h2>
          <p className="font-ui text-sm text-ivory/50 leading-relaxed mb-8">
            Cette plateforme est en mode démonstration. Utilisez les accès démo pour explorer toutes les fonctionnalités sans créer de compte.
          </p>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gold text-obsidian font-ui text-sm font-semibold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-colors"
          >
            <ArrowLeft size={16} />
            Accéder à la démo
          </Link>
        </div>
      </div>
    </div>
  )
}
