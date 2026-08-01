import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AirportField from './AirportField.jsx'
import { SwapIcon, CalendarIcon, UsersIcon, SearchIcon } from '../common/icons.jsx'
import { useBooking } from '../../context/BookingContext.jsx'

const CABINS = [
  { key: 'economy', label: 'Economy' },
  { key: 'premium', label: 'Premium' },
  { key: 'business', label: 'Business' }
]

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function SearchForm() {
  const navigate = useNavigate()
  const { setSearch } = useBooking()
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const [date, setDate] = useState(todayISO())
  const [passengers, setPassengers] = useState(1)
  const [cabin, setCabin] = useState('economy')
  const [error, setError] = useState('')

  function swap() {
    setFrom(to)
    setTo(from)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!from || !to) {
      setError('Choose both a departure and an arrival city.')
      return
    }
    if (from.code === to.code) {
      setError('Departure and arrival cities need to be different.')
      return
    }
    setError('')
    setSearch({ from: from.code, to: to.code, date, passengers, cabin, fromLabel: from, toLabel: to })
    navigate('/results')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
      className="rounded-xl2 surface card-shadow p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <AirportField label="From" value={from} onChange={setFrom} placeholder="City or airport" />
        <button
          type="button"
          onClick={swap}
          aria-label="Swap cities"
          className="mx-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full surface-2 text-muted hover-lift sm:mx-0 sm:mb-2.5"
        >
          <SwapIcon width={16} height={16} />
        </button>
        <AirportField label="To" value={to} onChange={setTo} placeholder="City or airport" />
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Depart</label>
          <div className="flex items-center gap-2 rounded-lg surface-2 px-3 py-2.5">
            <CalendarIcon width={16} height={16} className="text-muted" />
            <input
              type="date"
              value={date}
              min={todayISO()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Passengers</label>
          <div className="flex items-center gap-2 rounded-lg surface-2 px-3 py-2.5">
            <UsersIcon width={16} height={16} className="text-muted" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full bg-transparent text-sm outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Cabin</label>
          <div className="flex gap-1 rounded-lg surface-2 p-1">
            {CABINS.map((c) => (
              <button
                type="button"
                key={c.key}
                onClick={() => setCabin(c.key)}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors ${
                  cabin === c.key ? 'bg-beacon text-ink-950' : 'text-muted hover:text-[var(--text-primary)]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-signal-red">{error}</p>}

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-beacon py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <SearchIcon width={17} height={17} />
        Search flights
      </button>
    </motion.form>
  )
}
