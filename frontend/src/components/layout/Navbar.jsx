import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Menu, X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useLogout } from '@/hooks/useAuth'
import { useUnreadCount } from '@/hooks/useNotifications'
import { Avatar } from '@/components/ui/Avatar'
import clsx from 'clsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, isAuthenticated } = useAuthStore()
  const logout = useLogout()
  const { data: unreadData } = useUnreadCount()
  const unreadCount = unreadData?.unread_count || 0

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/couturieres', label: 'Couturières' },
    { to: '/studio', label: 'Studio IA' },
  ]

  const getDashboardLink = () => {
    if (!user) return '/login'
    if (user.role === 'admin') return '/admin'
    if (user.role === 'tailor') return '/dashboard/tailor'
    return '/dashboard/client'
  }

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-obsidian/95 backdrop-blur-md border-b border-gold/10 shadow-dark'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-xl text-ivory">
          <span className="text-gold-gradient">MT</span> Moda Creaz
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                clsx(
                  'font-ui text-xs tracking-widest uppercase transition-colors',
                  isActive ? 'text-gold' : 'text-ivory/60 hover:text-ivory'
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated() ? (
            <>
              {/* Notifications */}
              <Link to={getDashboardLink()} className="relative p-2 text-ivory/50 hover:text-gold transition-colors">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-obsidian text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-ivory/80 hover:text-ivory transition-colors"
                >
                  <Avatar name={user.full_name} size="sm" />
                  <span className="font-ui text-xs">{user.full_name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-charcoal border border-gold/20 rounded-sm shadow-dark z-50">
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 font-ui text-xs text-ivory/70 hover:text-gold hover:bg-gold/5 tracking-wide uppercase"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setDropdownOpen(false) }}
                      className="w-full text-left px-4 py-3 font-ui text-xs text-red-400 hover:bg-red-900/10 tracking-wide uppercase"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="font-ui text-xs tracking-widest uppercase text-ivory/60 hover:text-gold transition-colors">
                Connexion
              </Link>
              <Link
                to="/register"
                className="font-ui text-xs tracking-widest uppercase px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-all rounded-sm"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-ivory/60 hover:text-ivory transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-charcoal border-t border-gold/10 py-4">
          <div className="flex flex-col gap-1 px-6">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="font-ui text-xs tracking-widest uppercase py-3 text-ivory/60 hover:text-gold border-b border-slate-dark/50"
              >
                {label}
              </Link>
            ))}
            {isAuthenticated() ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setMenuOpen(false)}
                  className="font-ui text-xs tracking-widest uppercase py-3 text-ivory/60 hover:text-gold">
                  Dashboard
                </Link>
                <button onClick={() => { logout(); setMenuOpen(false) }}
                  className="text-left font-ui text-xs tracking-widest uppercase py-3 text-red-400">
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="font-ui text-xs tracking-widest uppercase py-3 text-gold">
                Connexion / S'inscrire
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
