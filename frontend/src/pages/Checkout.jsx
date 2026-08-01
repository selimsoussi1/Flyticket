import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext.jsx'
import { api } from '../services/api.js'
import BoardingPassPreview from '../components/booking/BoardingPassPreview.jsx'
import ProgressStepper from '../components/common/ProgressStepper.jsx'

function emptyPassenger() {
  return { firstName: '', lastName: '' }
}

export default function Checkout() {
  const navigate = useNavigate()
  const { flight, search, seats, contact, setContact, completeBooking } = useBooking()
  const [passengers, setPassengers] = useState(() => seats.map(() => emptyPassenger()))
  const [email, setEmail] = useState(contact?.email || '')
  const [phone, setPhone] = useState(contact?.phone || '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!flight || seats.length === 0) navigate('/')
  }, [flight, seats, navigate])

  const total = useMemo(() => {
    if (!flight) return 0
    return flight.price[search.cabin] * seats.length
  }, [flight, search.cabin, seats.length])

  function updatePassenger(i, field, value) {
    setPassengers((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (passengers.some((p) => !p.firstName.trim() || !p.lastName.trim())) {
      setError('Every passenger needs a first and last name.')
      return
    }
    if (!email.trim()) {
      setError('A contact email is required.')
      return
    }
    setSubmitting(true)
    try {
      const contactInfo = { email, phone }
      setContact(contactInfo)
      const { booking } = await api.createBooking({
        flightId: flight.id,
        cabin: search.cabin,
        seats,
        passengers,
        contact: contactInfo
      })
      completeBooking(booking)
      navigate(`/confirmation/${booking.pnr}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!flight) return null

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <div className="mb-6">
        <ProgressStepper activeKey="checkout" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl2 surface card-shadow p-5"
        >
          <h1 className="mb-4 font-display text-2xl font-bold">Passenger details</h1>

          {seats.map((seatId, i) => (
            <div key={seatId} className="mb-4 rounded-lg surface-2 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Passenger {i + 1} · Seat {seatId}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  value={passengers[i].firstName}
                  onChange={(e) => updatePassenger(i, 'firstName', e.target.value)}
                  placeholder="First name"
                  className="rounded-lg surface px-3 py-2.5 text-sm outline-none"
                />
                <input
                  value={passengers[i].lastName}
                  onChange={(e) => updatePassenger(i, 'lastName', e.target.value)}
                  placeholder="Last name"
                  className="rounded-lg surface px-3 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          ))}

          <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wide text-muted">Contact</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="rounded-lg surface-2 px-3 py-2.5 text-sm outline-none"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="rounded-lg surface-2 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          {error && <p className="mt-4 text-sm text-signal-red">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-lg bg-beacon py-3 text-sm font-semibold text-ink-950 transition-opacity disabled:opacity-60"
          >
            {submitting ? 'Confirming booking…' : `Pay $${total} & confirm`}
          </button>
        </motion.form>

        <BoardingPassPreview flight={flight} seats={seats} cabin={search.cabin} total={total} />
      </div>
    </div>
  )
}
