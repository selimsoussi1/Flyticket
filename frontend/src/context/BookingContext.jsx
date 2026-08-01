import React, { createContext, useContext, useMemo, useState } from 'react'

// Holds the in-progress booking as the traveler moves search -> results ->
// seats -> checkout -> confirmation. Kept in memory only (no browser storage),
// which is why the flow always starts fresh on a hard refresh.
const BookingContext = createContext(null)

const initialState = {
  search: { from: '', to: '', date: '', passengers: 1, cabin: 'economy' },
  flight: null,
  seats: [],
  passengers: [],
  contact: null,
  lastBooking: null
}

export function BookingProvider({ children }) {
  const [state, setState] = useState(initialState)

  const api = useMemo(() => ({
    setSearch: (search) => setState((s) => ({ ...s, search })),
    selectFlight: (flight) => setState((s) => ({ ...s, flight, seats: [], passengers: [] })),
    toggleSeat: (seatId, maxSeats) => setState((s) => {
      const has = s.seats.includes(seatId)
      if (has) return { ...s, seats: s.seats.filter((id) => id !== seatId) }
      if (s.seats.length >= maxSeats) return s
      return { ...s, seats: [...s.seats, seatId] }
    }),
    setPassengers: (passengers) => setState((s) => ({ ...s, passengers })),
    setContact: (contact) => setState((s) => ({ ...s, contact })),
    completeBooking: (booking) => setState((s) => ({ ...s, lastBooking: booking })),
    resetFlow: () => setState(initialState)
  }), [])

  return (
    <BookingContext.Provider value={{ ...state, ...api }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
