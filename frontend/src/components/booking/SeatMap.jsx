import React from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '../common/icons.jsx'

const CABIN_LABEL = { business: 'Business', premium: 'Premium Economy', economy: 'Economy' }

function SeatButton({ seat, isSelected, disabled, onToggle }) {
  if (seat.type === 'aisle') return <div className="w-5 sm:w-7" />

  const base =
    'seat-btn relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[10px] font-mono font-semibold sm:h-9 sm:w-9'

  let classes = base
  if (seat.status === 'occupied') {
    classes += ' cursor-not-allowed bg-[var(--border-hairline)] text-muted/60 line-through decoration-1'
  } else if (isSelected) {
    classes += ' bg-beacon text-ink-950 shadow-glow'
  } else if (seat.cabin === 'business') {
    classes += ' surface-2 text-contrail-dim dark:text-contrail ring-1 ring-inset ring-contrail/40 hover:ring-contrail'
  } else if (seat.extraLegroom) {
    classes += ' surface-2 text-signal-green ring-1 ring-inset ring-signal-green/40 hover:ring-signal-green'
  } else {
    classes += ' surface-2 hover:ring-1 hover:ring-inset hover:ring-beacon/60'
  }

  return (
    <button
      type="button"
      disabled={seat.status === 'occupied' || (disabled && !isSelected)}
      onClick={() => onToggle(seat)}
      title={`${seat.id} · $${seat.priceDelta} · ${CABIN_LABEL[seat.cabin]}`}
      className={classes}
    >
      {isSelected ? <CheckIcon width={14} height={14} /> : seat.letter}
    </button>
  )
}

export default function SeatMap({ seatMap, selectedSeats, maxSeats, onToggleSeat }) {
  if (!seatMap) return null
  const disabled = selectedSeats.length >= maxSeats
  let lastCabin = null

  return (
    <div className="sky-wash rounded-xl2 surface card-shadow p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">{seatMap.aircraft} cabin</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm surface-2" /> Available</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-beacon" /> Selected</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[var(--border-hairline)]" /> Taken</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm ring-1 ring-signal-green" /> Extra legroom</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-md flex-col items-center gap-1.5 overflow-x-auto pb-2">
        {seatMap.rows.map((row) => {
          const showDivider = row.cabin !== lastCabin
          lastCabin = row.cabin
          const isExit = seatMap.exitRows.includes(row.row)
          return (
            <React.Fragment key={row.row}>
              {showDivider && (
                <div className="mt-2 flex w-full items-center gap-2 first:mt-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">{CABIN_LABEL[row.cabin]}</span>
                  <div className="h-px flex-1 bg-[var(--border-hairline)]" />
                </div>
              )}
              <div className="flex items-center gap-1">
                <span className="w-5 shrink-0 font-mono text-[10px] text-muted">{row.row}</span>
                <div className="flex gap-1">
                  {row.seats.map((seat, i) => (
                    <SeatButton
                      key={seat.type === 'seat' ? seat.id : `aisle-${row.row}-${i}`}
                      seat={seat}
                      isSelected={seat.type === 'seat' && selectedSeats.includes(seat.id)}
                      disabled={disabled}
                      onToggle={(s) => onToggleSeat(s.id)}
                    />
                  ))}
                </div>
                {isExit && <span className="ml-1 text-[10px] font-semibold uppercase text-signal-green">exit</span>}
              </div>
            </React.Fragment>
          )
        })}
      </div>

      <motion.p
        key={selectedSeats.length}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center text-xs text-muted"
      >
        {selectedSeats.length}/{maxSeats} seat{maxSeats > 1 ? 's' : ''} selected
      </motion.p>
    </div>
  )
}
