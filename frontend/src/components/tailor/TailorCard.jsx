import { Link } from 'react-router-dom'
import { MapPin, Star, Award } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function TailorCard({ tailor }) {
  const {
    id, user, city, wilaya, specialties = [], avg_rating, total_orders,
    is_verified, profile_photo, price_base,
  } = tailor

  return (
    <Link to={`/couturieres/${id}`} className="group block">
      <div className="relative overflow-hidden rounded-sm border border-slate-dark group-hover:border-gold/40 transition-all duration-300 group-hover:shadow-gold">
        {/* Image */}
        <div className="relative h-64 bg-charcoal overflow-hidden">
          {profile_photo ? (
            <img
              src={profile_photo}
              alt={user.full_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-charcoal to-slate-dark">
              <span className="font-display text-4xl text-gold/30">
                {user.full_name?.[0]}
              </span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-card-gradient" />

          {/* Verified badge */}
          {is_verified && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-obsidian/80 border border-gold/40 rounded-sm px-2 py-1">
              <Award size={10} className="text-gold" />
              <span className="font-ui text-[10px] text-gold tracking-widest uppercase">Vérifié</span>
            </div>
          )}

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-gold text-obsidian font-ui text-xs tracking-widest uppercase px-4 py-2 rounded-sm font-semibold">
              Voir le profil
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-charcoal">
          <h3 className="font-display text-lg text-ivory mb-1">{user.full_name}</h3>
          <div className="flex items-center gap-1 text-ivory/50 text-xs font-ui mb-3">
            <MapPin size={11} />
            <span>{city || wilaya || 'Algérie'}</span>
          </div>

          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {specialties.slice(0, 3).map((s) => (
                <Badge key={s} status="gold" label={s} />
              ))}
              {specialties.length > 3 && (
                <span className="text-xs text-ivory/30 font-ui">+{specialties.length - 3}</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star size={13} fill="#C9A84C" stroke="#C9A84C" />
              <span className="text-gold font-ui text-sm font-semibold">
                {Number(avg_rating).toFixed(1)}
              </span>
              <span className="text-ivory/30 text-xs font-ui">({total_orders})</span>
            </div>
            {price_base && (
              <span className="text-gold font-ui text-sm">
                À partir de {price_base.toLocaleString()} DA
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
