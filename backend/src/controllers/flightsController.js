import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { generateFlights } from '../data/flights.js'
import { buildSeatMap } from '../data/aircraft.js'
import { getBookedSeats } from '../data/bookingsStore.js'

function parseFlightId(id) {
  // format: FLIGHTNUMBER-ORIGINDEST-DATE  e.g. AF123-JFKLHR-2026-09-14
  const [flightNumber, route, ...dateParts] = String(id).split('-')
  if (!flightNumber || !route || dateParts.length === 0) return null
  const origin = route.slice(0, 3)
  const destination = route.slice(3, 6)
  const date = dateParts.join('-')
  return { flightNumber, origin, destination, date }
}

function findFlightById(id) {
  const parsed = parseFlightId(id)
  if (!parsed) return null
  const results = generateFlights({ from: parsed.origin, to: parsed.destination, date: parsed.date === 'flex' ? undefined : parsed.date })
  return results.find((f) => f.id === id) || null
}

export const searchFlights = asyncHandler(async (req, res) => {
  const { from, to, date, cabin } = req.query
  if (!from || !to) {
    throw ApiError.badRequest('Both "from" and "to" airport codes are required.')
  }
  if (from.toUpperCase() === to.toUpperCase()) {
    throw ApiError.badRequest('Origin and destination must be different airports.')
  }
  const flights = generateFlights({ from, to, date, cabin: cabin || 'economy' })
  res.json({ count: flights.length, flights })
})

export const getFlight = asyncHandler(async (req, res) => {
  const flight = findFlightById(req.params.id)
  if (!flight) throw ApiError.notFound(`Flight ${req.params.id} was not found.`)
  res.json({ flight })
})

export const getFlightSeatMap = asyncHandler(async (req, res) => {
  const flight = findFlightById(req.params.id)
  if (!flight) throw ApiError.notFound(`Flight ${req.params.id} was not found.`)

  const seatMap = buildSeatMap(flight.id, flight.aircraft)
  const bookedSeats = getBookedSeats(flight.id)

  seatMap.rows.forEach((row) => {
    row.seats.forEach((seat) => {
      if (seat.type === 'seat' && bookedSeats.has(seat.id)) {
        seat.status = 'occupied'
      }
    })
  })

  res.json({ flightId: flight.id, ...seatMap })
})

export { findFlightById }
