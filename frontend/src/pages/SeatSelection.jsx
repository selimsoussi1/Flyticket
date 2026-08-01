import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext.jsx'
import { api } from '../services/api.js'
import SeatMap from '../components/booking/SeatMap.jsx'
import BoardingPassPreview from '../components/booking/BoardingPassPreview.jsx'
import ProgressStepper from '../components/common/ProgressStepper.jsx'

export default function SeatSelection() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { flight, search, seats, toggleSeat, selectFlight } = useBooking()
  const [seatMap, setSeatMap] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setStatus('loading')
      try {
        let activeFlight = flight
        if (!activeFlight || activeFlight.id !== id) {
          const data = await api.getFlight(id)
          activeFlight = data.flight
          selectFlight(activeFlight)
        }
        const seatData = await api.getSeatMap(id)
        if (!cancelled) {
          setSeatMap(seatData)
          setStatus('done')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setStatus('error')
        }
      }
    }
    load()
    return () => { cancelled = true }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const maxSeats = search.passengers || 1
  const seatFeesTotal = seatMap
    ? seatMap.rows.flatMap((r) => r.seats).filter((s) => s.type === 'seat' && seats.includes(s.id))
        .reduce((sum, s) => sum + s.priceDelta, 0)
    : 0
  const fareTotal = flight ? flight.price[search.cabin] * maxSeats : 0
  const total = fareTotal + seatFeesTotal

  function handleContinue() {
    navigate('/checkout')
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="h-96 animate-pulse rounded-xl2 surface-2" />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="mx-auto max-w-2xl px-5 py-10 text-center">
        <p className="font-semibold text-signal-red">Couldn't load this flight</p>
        <p className="mt-1 text-sm text-muted">{error}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <div className="mb-6">
        <ProgressStepper activeKey="seats" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="mb-4 font-display text-2xl font-bold">Choose your seat{maxSeats > 1 ? 's' : ''}</h1>
          <SeatMap
            seatMap={seatMap}
            selectedSeats={seats}
            maxSeats={maxSeats}
            onToggleSeat={(seatId) => toggleSeat(seatId, maxSeats)}
          />
        </div>
        <div>
          <BoardingPassPreview flight={flight} seats={seats} cabin={search.cabin} total={total} />
          <motion.button
            layout
            disabled={seats.length !== maxSeats}
            onClick={handleContinue}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full rounded-lg bg-beacon py-3 text-sm font-semibold text-ink-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {seats.length === maxSeats ? 'Continue to passenger details' : `Select ${maxSeats - seats.length} more seat${maxSeats - seats.length === 1 ? '' : 's'}`}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
