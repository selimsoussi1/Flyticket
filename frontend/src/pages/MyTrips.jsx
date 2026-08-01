import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'
import SplitFlap from '../components/common/SplitFlap.jsx'
import { PlaneIcon, TicketIcon } from '../components/common/icons.jsx'

export default function MyTrips() {
  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    api.listBookings()
      .then((data) => { setBookings(data.bookings); setStatus('done') })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-5 py-8">
      <h1 className="mb-1 font-display text-2xl font-bold">My trips</h1>
      <p className="mb-6 text-sm text-muted">Every booking made this session, most recent first.</p>

      {status === 'loading' && (
        <div className="space-y-3">
          {[0, 1].map((i) => <div key={i} className="h-28 animate-pulse rounded-xl2 surface-2" />)}
        </div>
      )}

      {status === 'done' && bookings.length === 0 && (
        <div className="rounded-xl2 surface card-shadow p-8 text-center">
          <TicketIcon width={28} height={28} className="mx-auto mb-3 text-muted" />
          <p className="font-semibold">No trips yet</p>
          <p className="mt-1 text-sm text-muted">Once you book a flight, it'll show up here.</p>
          <Link to="/" className="mt-4 inline-block rounded-lg bg-beacon px-4 py-2 text-sm font-semibold text-ink-950">
            Search flights
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {bookings.map((b, i) => (
          <motion.div
            key={b.pnr}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col gap-3 rounded-xl2 surface card-shadow p-4 hover-lift sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-beacon/15 text-beacon-dim dark:text-beacon">
                <PlaneIcon width={18} height={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  {b.flight.origin.code} <span className="text-muted">→</span> {b.flight.destination.code}
                </p>
                <p className="text-xs text-muted">{b.flight.airline} · {b.flight.flightNumber} · {b.seats.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SplitFlap value={b.pnr} className="font-mono text-sm font-bold text-beacon-dim dark:text-beacon" />
              <Link to={`/confirmation/${b.pnr}`} className="rounded-lg surface-2 px-3 py-1.5 text-xs font-semibold hover-lift">
                View pass
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
