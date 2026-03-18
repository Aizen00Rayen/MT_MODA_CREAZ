import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, Inbox, Package, Image, DollarSign, Star, User,
} from 'lucide-react'
import Navbar from './Navbar'
import clsx from 'clsx'

const links = [
  { to: '/dashboard/tailor', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/tailor/requests', label: 'Demandes', icon: Inbox },
  { to: '/dashboard/tailor/orders', label: 'Commandes', icon: Package },
  { to: '/dashboard/tailor/portfolio', label: 'Portfolio', icon: Image },
  { to: '/dashboard/tailor/pricing', label: 'Tarifs', icon: DollarSign },
  { to: '/dashboard/tailor/reviews', label: 'Avis', icon: Star },
  { to: '/dashboard/tailor/profile', label: 'Profil', icon: User },
]

export default function TailorDashboardLayout() {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />
      <div className="flex pt-16">
        <aside className="w-60 min-h-screen bg-charcoal border-r border-gold/10 fixed left-0 top-16 hidden md:block">
          <nav className="p-4 space-y-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-ui tracking-wide uppercase transition-colors',
                    isActive
                      ? 'bg-gold/10 text-gold border border-gold/20'
                      : 'text-ivory/50 hover:text-ivory hover:bg-ivory/5'
                  )
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 md:ml-60 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
