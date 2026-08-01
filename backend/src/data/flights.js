import { airports, findAirport } from './airports.js'

const AIRLINES = [
  { code: 'AF', name: 'Aurora Air', aircraft: 'narrowbody' },
  { code: 'QT', name: 'Quantis', aircraft: 'widebody' },
  { code: 'NV', name: 'Northvale Airways', aircraft: 'narrowbody' },
  { code: 'SR', name: 'Solara', aircraft: 'widebody' },
  { code: 'MR', name: 'Meridian Air', aircraft: 'narrowbody' }
]

function seededRandom(seed) {
  let value = seed
  return function next() {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

function formatTime(date) {
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${pad(m)}m`
}

// Generates a deterministic-but-varied set of flight offers for a given
// origin/destination/date combination. In a real backend this would be a
// call out to a GDS / fare API; here it stands in as a believable mock.
export function generateFlights({ from, to, date, cabin = 'economy' }) {
  const origin = findAirport(from)
  const destination = findAirport(to)
  if (!origin || !destination) return []
  if (origin.code === destination.code) return []

  const seed = Array.from(`${origin.code}${destination.code}${date}`)
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const rand = seededRandom(seed)

  const baseDate = date ? new Date(`${date}T00:00:00.000Z`) : new Date()
  const flights = []

  const count = 5 + Math.floor(rand() * 3)
  for (let i = 0; i < count; i += 1) {
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)]
    const departHour = 5 + Math.floor(rand() * 17)
    const departMinute = Math.floor(rand() * 4) * 15
    const departure = addMinutes(baseDate, departHour * 60 + departMinute)
    const durationMinutes = 90 + Math.floor(rand() * 540)
    const arrival = addMinutes(departure, durationMinutes)
    const stops = rand() < 0.65 ? 0 : rand() < 0.9 ? 1 : 2
    const basePrice = Math.round(60 + rand() * 380 + stops * -15)
    const flightNumber = `${airline.code}${100 + Math.floor(rand() * 899)}`
    const id = `${flightNumber}-${origin.code}${destination.code}-${date || 'flex'}`

    flights.push({
      id,
      airline: airline.name,
      airlineCode: airline.code,
      flightNumber,
      aircraft: airline.aircraft,
      origin,
      destination,
      departure: departure.toISOString(),
      arrival: arrival.toISOString(),
      departureTime: formatTime(departure),
      arrivalTime: formatTime(arrival),
      durationMinutes,
      duration: formatDuration(durationMinutes),
      stops,
      price: {
        economy: basePrice,
        premium: Math.round(basePrice * 1.7),
        business: Math.round(basePrice * 3.4)
      },
      cabinRequested: cabin
    })
  }

  return flights.sort((a, b) => a.price[cabin] - b.price[cabin] || a.durationMinutes - b.durationMinutes)
}

export function getAllAirports() {
  return airports
}
