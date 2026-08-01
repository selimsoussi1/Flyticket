const BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  })
  const isJson = res.headers.get('content-type')?.includes('application/json')
  const body = isJson ? await res.json() : null

  if (!res.ok) {
    const message = body?.error?.message || `Request failed with status ${res.status}`
    throw new Error(message)
  }
  return body
}

export const api = {
  searchAirports: (q) => request(`/api/airports?q=${encodeURIComponent(q || '')}`),
  searchFlights: ({ from, to, date, cabin }) => {
    const params = new URLSearchParams({ from, to, cabin })
    if (date) params.set('date', date)
    return request(`/api/flights?${params.toString()}`)
  },
  getFlight: (id) => request(`/api/flights/${encodeURIComponent(id)}`),
  getSeatMap: (id) => request(`/api/flights/${encodeURIComponent(id)}/seatmap`),
  createBooking: (payload) => request('/api/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  getBooking: (pnr) => request(`/api/bookings/${encodeURIComponent(pnr)}`),
  listBookings: () => request('/api/bookings')
}
