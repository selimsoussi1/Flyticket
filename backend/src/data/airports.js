// A small, realistic set of major airports used to power search + autocomplete.
export const airports = [
  { code: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy Intl' },
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow' },
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle' },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates', name: 'Dubai Intl' },
  { code: 'NRT', city: 'Tokyo', country: 'Japan', name: 'Narita Intl' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Changi' },
  { code: 'TUN', city: 'Tunis', country: 'Tunisia', name: 'Tunis-Carthage' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey', name: 'Istanbul Airport' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', name: 'El Prat' },
  { code: 'FCO', city: 'Rome', country: 'Italy', name: 'Fiumicino' },
  { code: 'GRU', city: 'Sao Paulo', country: 'Brazil', name: 'Guarulhos' },
  { code: 'SYD', city: 'Sydney', country: 'Australia', name: 'Kingsford Smith' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', name: 'Pearson Intl' },
  { code: 'CAI', city: 'Cairo', country: 'Egypt', name: 'Cairo Intl' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Schiphol' },
  { code: 'DOH', city: 'Doha', country: 'Qatar', name: 'Hamad Intl' }
]

export function searchAirports(query) {
  if (!query || !query.trim()) return airports.slice(0, 8)
  const q = query.trim().toLowerCase()
  return airports.filter((a) =>
    a.code.toLowerCase().includes(q) ||
    a.city.toLowerCase().includes(q) ||
    a.name.toLowerCase().includes(q) ||
    a.country.toLowerCase().includes(q)
  )
}

export function findAirport(code) {
  return airports.find((a) => a.code.toLowerCase() === String(code).toLowerCase())
}
