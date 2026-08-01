// In-memory persistence layer. Swapping this for a real database later means
// replacing the four functions below with Postgres/Mongo calls — nothing
// upstream (controllers, routes) needs to change.
import { generatePNR } from '../utils/pnr.js'

const bookings = new Map()
// flightId -> Set of seat ids that have been booked, so seat maps stay
// consistent across repeated searches within the same server session.
const bookedSeatsByFlight = new Map()

export function getBookedSeats(flightId) {
  return bookedSeatsByFlight.get(flightId) || new Set()
}

export function createBooking({ flight, cabin, seats, passengers, contact }) {
  let pnr = generatePNR()
  while (bookings.has(pnr)) pnr = generatePNR()

  const record = {
    pnr,
    flight,
    cabin,
    seats,
    passengers,
    contact,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
  bookings.set(pnr, record)

  const claimed = bookedSeatsByFlight.get(flight.id) || new Set()
  seats.forEach((s) => claimed.add(s))
  bookedSeatsByFlight.set(flight.id, claimed)

  return record
}

export function getBooking(pnr) {
  return bookings.get(String(pnr).toUpperCase())
}

export function listBookings() {
  return Array.from(bookings.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
