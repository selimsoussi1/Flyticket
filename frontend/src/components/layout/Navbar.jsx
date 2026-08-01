import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import { PlaneIcon, BellIcon, SettingsIcon, SunIcon, MoonIcon, ChevronDownIcon, LogoutIcon, TicketIcon } from '../common/icons.jsx'

const NAV_LINKS = [
  { to: '/', label: 'Book' },
  { to: '/trips', label: 'My trips' }
]

const NOTIFICATIONS = [
  { id: 1, title: 'Fare drop', body: 'JFK to LHR is down 12% for your saved dates.' },
  { id: 2, title: 'Check-in open', body: 'Online check-in opens 24h before departure.' },
  { id: 3, title: 'Gate reminder', body: 'Boarding usually starts 45 minutes before takeoff.' }
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState(null) // 'notifications' | 'profile' | null

  const toggle = (menu) => setOpenMenu((m) => (m === menu ? null : menu))

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--bg-app)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpenMenu(null)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-beacon/15 text-beacon">
            <PlaneIcon width={18} height={18} />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">DPTR</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-beacon-dim dark:text-beacon' : 'text-muted hover:text-[var(--text-primary)]'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover-lift surface"
          >
            {theme === 'dark' ? <SunIcon width={17} height={17} /> : <MoonIcon width={17} height={17} />}
          </button>

          <div className="relative">
            <button
              onClick={() => toggle('notifications')}
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted hover-lift surface"
            >
              <BellIcon width={17} height={17} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-signal-red" />
            </button>
            <AnimatePresence>
              {openMenu === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 mt-2 w-72 rounded-xl2 surface card-shadow p-2"
                >
                  <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Notifications</p>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="rounded-lg px-2 py-2 hover:surface-2">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted">{n.body}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => toggle('profile')}
              className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 hover-lift surface"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-contrail/20 font-mono text-xs font-semibold text-contrail-dim dark:text-contrail">
                AB
              </span>
              <ChevronDownIcon width={14} height={14} className="text-muted" />
            </button>
            <AnimatePresence>
              {openMenu === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl2 surface card-shadow p-2"
                >
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium">Amine Ben Salah</p>
                    <p className="text-xs text-muted">amine@example.com</p>
                  </div>
                  <div className="my-1 h-px bg-[var(--border-hairline)]" />
                  <Link to="/profile" onClick={() => setOpenMenu(null)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:surface-2">
                    <SettingsIcon width={16} height={16} /> Profile & settings
                  </Link>
                  <Link to="/trips" onClick={() => setOpenMenu(null)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:surface-2">
                    <TicketIcon width={16} height={16} /> My trips
                  </Link>
                  <div className="my-1 h-px bg-[var(--border-hairline)]" />
                  <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-signal-red hover:surface-2">
                    <LogoutIcon width={16} height={16} /> Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
