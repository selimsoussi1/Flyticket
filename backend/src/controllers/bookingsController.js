import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { createBooking, getBooking, listBookings, getBookedSeats } from '../data/bookingsStore.js'
import { buildSeatMap } from '../data/aircraft.js'
import { findFlightById } from './flightsController.js'

export const postBooking = asyncHandler(async (req, res) => {
  const { flightId, cabin, seats, passengers, contact } = req.body || {}

  if (!flightId || !cabin || !Array.isArray(seats) || seats.length === 0) {
    throw ApiError.badRequest('flightId, cabin, and a non-empty seats array are required.')
  }
  if (!Array.isArray(passengers) || passengers.length !== seats.length) {
    throw ApiError.badRequest('passengers array must match the number of selected seats.')
  }
  for (const p of passengers) {
    if (!p.firstName || !p.lastName) {
      throw ApiError.badRequest('Every passenger needs a first and last name.')
    }
  }
  if (!contact || !contact.email) {
    throw ApiError.badRequest('A contact email is required.')
  }

  const flight = findFlightById(flightId)
  if (!flight) throw ApiError.notFound(`Flight ${flightId} was not found.`)

  const seatMap = buildSeatMap(flight.id, flight.aircraft)
  const bookedSeats = getBookedSeats(flight.id)
  const validSeatIds = new Set(
    seatMap.rows.flatMap((r) => r.seats.filter((s) => s.type === 'seat').map((s) => s.id))
  )
  for (const seatId of seats) {
    if (!validSeatIds.has(seatId)) throw ApiError.badRequest(`Seat ${seatId} does not exist on this aircraft.`)
    if (bookedSeats.has(seatId)) throw ApiError.conflict(`Seat ${seatId} was just taken by another passenger.`)
  }

  const booking = createBooking({ flight, cabin, seats, passengers, contact })
  res.status(201).json({ booking })
})

export const getBookingByPnr = asyncHandler(async (req, res) => {
  const booking = getBooking(req.params.pnr)
  if (!booking) throw ApiError.notFound(`No booking found for reference ${req.params.pnr}.`)
  res.json({ booking })
})

export const getAllBookings = asyncHandler(async (req, res) => {
  res.json({ bookings: listBookings() })
})
