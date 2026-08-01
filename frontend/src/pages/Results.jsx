import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext.jsx'
import { api } from '../services/api.js'
import FlightCard from '../components/booking/FlightCard.jsx'
import ProgressStepper from '../components/common/ProgressStepper.jsx'

const SORTS = [
  { key: 'price', label: 'Price' },
  { key: 'duration', label: 'Duration' }
]

export default function Results() {
  const { search, selectFlight } = useBooking()
  const navigate = useNavigate()
  const [flights, setFlights] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [sort, setSort] = useState('price')

  useEffect(() => {
    if (!search.from || !search.to) {
      navigate('/')
      return
    }
    setStatus('loading')
    api.searchFlights(search)
      .then((data) => {
        setFlights(data.flights)
        setStatus('done')
      })
      .catch((err) => {
        setError(err.message)
        setStatus('error')
      })
  }, [search, navigate])

  function handleSelect(flight) {
    selectFlight(flight)
    navigate(`/flights/${encodeURIComponent(flight.id)}/seats`)
  }

  const sorted = [...flights].sort((a, b) => {
    if (sort === 'price') return a.price[search.cabin] - b.price[search.cabin]
    return a.durationMinutes - b.durationMinutes
  })

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      <div className="mb-6">
        <ProgressStepper activeKey="flight" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">
            {search.fromLabel?.city || search.from} <span className="text-muted">to</span> {search.toLabel?.city || search.to}
          </h1>
          <p className="text-sm text-muted">
            {search.date || 'Flexible dates'} · {search.passengers} passenger{search.passengers > 1 ? 's' : ''} · {search.cabin}
          </p>
        </div>
        <div className="flex gap-1 rounded-lg surface-2 p-1">
          {SORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                sort === s.key ? 'bg-beacon text-ink-950' : 'text-muted'
              }`}
            >
              Sort: {s.label}
            </button>
          ))}
        </div>
      </div>

      {status === 'loading' && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl2 surface-2" />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-xl2 surface card-shadow p-6 text-center">
          <p className="text-sm font-semibold text-signal-red">Couldn't load flights</p>
          <p className="mt-1 text-sm text-muted">{error}</p>
        </div>
      )}

      {status === 'done' && sorted.length === 0 && (
        <div className="rounded-xl2 surface card-shadow p-6 text-center">
          <p className="text-sm font-semibold">No flights on this route yet</p>
          <p className="mt-1 text-sm text-muted">Try a different date or a nearby airport.</p>
        </div>
      )}

      {status === 'done' && sorted.length > 0 && (
        <motion.div layout className="space-y-3">
          {sorted.map((flight, i) => (
            <FlightCard key={flight.id} flight={flight} cabin={search.cabin} onSelect={handleSelect} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
