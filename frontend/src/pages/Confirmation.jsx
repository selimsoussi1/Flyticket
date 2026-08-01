import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../services/api.js'
import { useBooking } from '../context/BookingContext.jsx'
import SplitFlap from '../components/common/SplitFlap.jsx'
import ProgressStepper from '../components/common/ProgressStepper.jsx'
import { PlaneIcon, CheckIcon } from '../components/common/icons.jsx'

export default function Confirmation() {
  const { pnr } = useParams()
  const { lastBooking, resetFlow } = useBooking()
  const [booking, setBooking] = useState(lastBooking?.pnr === pnr ? lastBooking : null)
  const [status, setStatus] = useState(booking ? 'done' : 'loading')

  useEffect(() => {
    if (booking) return
    api.getBooking(pnr)
      .then((data) => { setBooking(data.booking); setStatus('done') })
      .catch(() => setStatus('error'))
  }, [pnr]) // eslint-disable-line react-hooks/exhaustive-deps

  if (status === 'loading') {
    return <div className="mx-auto max-w-lg px-5 py-16 text-center text-sm text-muted">Loading your boarding pass…</div>
  }
  if (status === 'error' || !booking) {
    return (
      <div className="mx-auto max-w-lg px-5 py-16 text-center">
        <p className="font-semibold text-signal-red">We couldn't find that confirmation</p>
        <Link to="/" className="mt-3 inline-block text-sm text-beacon-dim dark:text-beacon">Start a new search</Link>
      </div>
    )
  }

  const { flight } = booking
  const total = flight.price[booking.cabin] * booking.seats.length

  return (
    <div className="sky-wash mx-auto max-w-2xl px-5 py-10">
      <div className="mb-6">
        <ProgressStepper activeKey="confirm" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
        className="mb-6 flex flex-col items-center text-center"
      >
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-signal-green/15 text-signal-green">
          <CheckIcon width={26} height={26} />
        </span>
        <h1 className="font-display text-3xl font-bold">You're booked</h1>
        <p className="mt-1 text-sm text-muted">A confirmation has been sent to {booking.contact.email}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotateX: -12, y: 20 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.7, 0.3, 1] }}
        style={{ transformPerspective: 800 }}
        className="overflow-hidden rounded-xl2 surface card-shadow"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] p-5">
          <div className="flex items-center gap-2">
            <PlaneIcon width={18} height={18} className="text-beacon" />
            <span className="font-display font-bold">DPTR Boarding Pass</span>
          </div>
          <span className="rounded-full bg-signal-green/15 px-2.5 py-1 text-xs font-semibold text-signal-green">Confirmed</span>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <SplitFlap value={flight.origin.code} className="font-mono text-3xl font-extrabold" />
              <p className="text-xs text-muted">{flight.origin.city}</p>
            </div>
            <div className="flex flex-col items-center text-muted">
              <PlaneIcon width={22} height={22} />
              <span className="mt-1 font-mono text-[11px]">{flight.duration}</span>
            </div>
            <div className="text-right">
              <SplitFlap value={flight.destination.code} className="font-mono text-3xl font-extrabold" />
              <p className="text-xs text-muted">{flight.destination.city}</p>
            </div>
          </div>

          <div className="my-5 h-px border-t border-dashed border-[var(--border-hairline)]" />

          <div className="grid grid-cols-2 gap-y-4 text-sm sm:grid-cols-4">
            <div><dt className="text-xs text-muted">Flight</dt><dd className="font-mono font-semibold">{flight.flightNumber}</dd></div>
            <div><dt className="text-xs text-muted">Depart</dt><dd className="font-mono font-semibold">{flight.departureTime}</dd></div>
            <div><dt className="text-xs text-muted">Cabin</dt><dd className="font-mono font-semibold capitalize">{booking.cabin}</dd></div>
            <div><dt className="text-xs text-muted">Seats</dt><dd className="font-mono font-semibold">{booking.seats.join(', ')}</dd></div>
          </div>

          <div className="my-5 h-px border-t border-dashed border-[var(--border-hairline)]" />

          <div className="flex items-center justify-between rounded-lg surface-2 px-4 py-3">
            <div>
              <p className="text-xs text-muted">Confirmation code</p>
              <SplitFlap value={booking.pnr} className="font-mono text-2xl font-bold text-beacon-dim dark:text-beacon" />
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">Total paid</p>
              <p className="font-mono text-2xl font-bold">${total}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex justify-center gap-3">
        <Link to="/trips" className="rounded-lg surface-2 px-4 py-2.5 text-sm font-semibold hover-lift">View my trips</Link>
        <Link to="/" onClick={resetFlow} className="rounded-lg bg-beacon px-4 py-2.5 text-sm font-semibold text-ink-950 hover-lift">Book another flight</Link>
      </div>
    </div>
  )
}
