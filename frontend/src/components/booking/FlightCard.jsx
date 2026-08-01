import React from 'react'
import { motion } from 'framer-motion'
import SplitFlap from '../common/SplitFlap.jsx'

const STOP_LABEL = { 0: 'Nonstop', 1: '1 stop', 2: '2 stops' }

export default function FlightCard({ flight, cabin, onSelect, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="flex flex-col gap-4 rounded-xl2 surface card-shadow p-4 hover-lift sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-contrail/15 font-mono text-xs font-bold text-contrail-dim dark:text-contrail">
          {flight.airlineCode}
        </div>
        <div>
          <p className="text-sm font-semibold">{flight.airline}</p>
          <p className="font-mono text-xs text-muted">{flight.flightNumber} · {flight.aircraft === 'widebody' ? 'Boeing 777' : 'Airbus A320'}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="text-center">
          <SplitFlap value={flight.departureTime} className="font-mono text-lg font-semibold" />
          <p className="text-xs text-muted">{flight.origin.code}</p>
        </div>
        <div className="flex w-20 flex-col items-center sm:w-28">
          <p className="text-xs text-muted">{flight.duration}</p>
          <div className="my-1 h-px w-full bg-[var(--border-hairline)]" />
          <p className="text-xs text-muted">{STOP_LABEL[flight.stops]}</p>
        </div>
        <div className="text-center">
          <SplitFlap value={flight.arrivalTime} className="font-mono text-lg font-semibold" />
          <p className="text-xs text-muted">{flight.destination.code}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
        <p className="font-mono text-2xl font-bold text-beacon-dim dark:text-beacon">
          ${flight.price[cabin]}
        </p>
        <button
          onClick={() => onSelect(flight)}
          className="rounded-lg bg-beacon px-4 py-2 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Select
        </button>
      </div>
    </motion.div>
  )
}
