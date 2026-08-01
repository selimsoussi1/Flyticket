import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import { SunIcon, MoonIcon, BellIcon, SettingsIcon } from '../components/common/icons.jsx'

export default function Profile() {
  const { theme, toggleTheme } = useTheme()
  const [notifyFares, setNotifyFares] = useState(true)
  const [notifyGate, setNotifyGate] = useState(true)

  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <h1 className="mb-1 flex items-center gap-2 font-display text-2xl font-bold">
        <SettingsIcon width={22} height={22} /> Profile & settings
      </h1>
      <p className="mb-6 text-sm text-muted">These preferences apply for this session.</p>

      <div className="mb-4 rounded-xl2 surface card-shadow p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Account</p>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-contrail/20 font-mono text-sm font-semibold text-contrail-dim dark:text-contrail">AB</span>
          <div>
            <p className="text-sm font-semibold">Amine Ben Salah</p>
            <p className="text-xs text-muted">amine@example.com</p>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-xl2 surface card-shadow p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Appearance</p>
        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-lg surface-2 px-4 py-3 text-sm"
        >
          <span className="flex items-center gap-2">
            {theme === 'dark' ? <MoonIcon width={16} height={16} /> : <SunIcon width={16} height={16} />}
            {theme === 'dark' ? 'Dark mode' : 'Light mode'}
          </span>
          <span className="text-xs text-muted">Tap to switch</span>
        </button>
      </div>

      <div className="rounded-xl2 surface card-shadow p-5">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <BellIcon width={14} height={14} /> Notifications
        </p>
        <label className="mb-2 flex items-center justify-between rounded-lg surface-2 px-4 py-3 text-sm">
          Fare drop alerts
          <input type="checkbox" checked={notifyFares} onChange={() => setNotifyFares((v) => !v)} className="h-4 w-4 accent-beacon" />
        </label>
        <label className="flex items-center justify-between rounded-lg surface-2 px-4 py-3 text-sm">
          Gate & boarding reminders
          <input type="checkbox" checked={notifyGate} onChange={() => setNotifyGate((v) => !v)} className="h-4 w-4 accent-beacon" />
        </label>
      </div>
    </div>
  )
}
