import React from 'react'
import { motion } from 'framer-motion'
import SplitFlap from '../common/SplitFlap.jsx'
import { PlaneIcon } from '../common/icons.jsx'

// Builds itself up field by field as the traveler moves through the flow —
// echoes the departure-board motif and gives a persistent sense of progress.
export default function BoardingPassPreview({ flight, seats = [], cabin, total, pnr }) {
  if (!flight) return null

  return (
    <motion.div
      layout
      className="sticky top-20 overflow-hidden rounded-xl2 surface card-shadow"
    >
      <div className="sky-wash flex items-center justify-between border-b border-[var(--border-hairline)] p-4">
        <div className="flex items-center gap-2">
          <PlaneIcon width={16} height={16} className="text-beacon" />
          <span className="font-display text-sm font-bold">Boarding pass</span>
        </div>
        <span className="font-mono text-xs text-muted">{cabin?.toUpperCase()}</span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <SplitFlap value={flight.origin.code} className="font-mono text-2xl font-bold" />
            <p className="text-xs text-muted">{flight.origin.city}</p>
          </div>
          <PlaneIcon width={18} height={18} className="text-muted" />
          <div className="text-right">
            <SplitFlap value={flight.destination.code} className="font-mono text-2xl font-bold" />
            <p className="text-xs text-muted">{flight.destination.city}</p>
          </div>
        </div>

        <div className="my-4 h-px w-full border-t border-dashed border-[var(--border-hairline)]" />

        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-muted">Flight</dt>
            <dd className="font-mono font-semibold">{flight.flightNumber}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Departs</dt>
            <dd className="font-mono font-semibold">{flight.departureTime}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Seats</dt>
            <dd className="font-mono font-semibold">
              {seats.length > 0 ? seats.join(', ') : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Duration</dt>
            <dd className="font-mono font-semibold">{flight.duration}</dd>
          </div>
        </dl>

        {typeof total === 'number' && (
          <div className="mt-4 flex items-center justify-between rounded-lg surface-2 px-3 py-2.5">
            <span className="text-sm text-muted">Total</span>
            <span className="font-mono text-lg font-bold text-beacon-dim dark:text-beacon">${total}</span>
          </div>
        )}

        {pnr && (
          <div className="mt-4 rounded-lg bg-signal-green/10 px-3 py-2.5 text-center">
            <p className="text-xs text-muted">Confirmation code</p>
            <SplitFlap value={pnr} className="justify-center font-mono text-xl font-bold text-signal-green" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
