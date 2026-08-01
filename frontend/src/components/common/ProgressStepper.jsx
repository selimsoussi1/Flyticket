import React from 'react'
import { motion } from 'framer-motion'

// A genuine sequence — search, choose flight, pick seat, pay, confirm — so
// numbering here encodes real order the traveler needs, unlike a decorative
// 01/02/03 used for its own sake.
const STEPS = [
  { key: 'search', label: 'Search' },
  { key: 'flight', label: 'Flight' },
  { key: 'seats', label: 'Seat' },
  { key: 'checkout', label: 'Passenger' },
  { key: 'confirm', label: 'Board' }
]

export default function ProgressStepper({ activeKey }) {
  const activeIndex = STEPS.findIndex((s) => s.key === activeKey)

  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {STEPS.map((step, i) => {
        const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'upcoming'
        return (
          <li key={step.key} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs font-mono font-semibold transition-colors
                  ${state === 'done' ? 'bg-signal-green/20 text-signal-green' : ''}
                  ${state === 'active' ? 'bg-beacon/20 text-beacon' : ''}
                  ${state === 'upcoming' ? 'surface-2 text-muted' : ''}`}
              >
                {state === 'active' && (
                  <motion.span
                    layoutId="stepper-glow"
                    className="absolute inset-0 rounded-full shadow-glow"
                  />
                )}
                <span className="relative">{i + 1}</span>
              </div>
              <span className={`hidden text-sm sm:inline ${state === 'upcoming' ? 'text-muted' : ''}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-4 sm:w-8 ${i < activeIndex ? 'bg-signal-green/50' : 'bg-[var(--border-hairline)]'}`} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
