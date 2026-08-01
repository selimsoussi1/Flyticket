// Aircraft seat map templates. Each defines row count, seat letters per row,
// which rows belong to which cabin, and the aisle positions used to render
// the cabin cross-section on the frontend.
export const aircraftTemplates = {
  narrowbody: {
    label: 'Airbus A320',
    layout: ['A', 'B', 'C', '', 'D', 'E', 'F'],
    rows: 30,
    cabins: [
      { key: 'business', label: 'Business', rows: [1, 4], priceMultiplier: 3.2 },
      { key: 'premium', label: 'Premium Economy', rows: [5, 9], priceMultiplier: 1.6 },
      { key: 'economy', label: 'Economy', rows: [10, 30], priceMultiplier: 1 }
    ],
    exitRows: [12, 13],
    extraLegroomRows: [10, 12, 13]
  },
  widebody: {
    label: 'Boeing 777',
    layout: ['A', 'B', 'C', '', 'D', 'E', 'F', 'G', '', 'H', 'J', 'K'],
    rows: 42,
    cabins: [
      { key: 'business', label: 'Business', rows: [1, 6], priceMultiplier: 3.6 },
      { key: 'premium', label: 'Premium Economy', rows: [7, 12], priceMultiplier: 1.7 },
      { key: 'economy', label: 'Economy', rows: [13, 42] }
    ],
    exitRows: [14, 15, 28],
    extraLegroomRows: [13, 14, 15, 28]
  }
}

function cabinForRow(template, row) {
  return template.cabins.find((c) => row >= c.rows[0] && row <= c.rows[1])
}

// Deterministic pseudo-random occupancy so the same flight always renders
// the same seat map (until a booking mutates it in-memory).
function seededRandom(seed) {
  let value = seed
  return function next() {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

export function buildSeatMap(flightId, aircraftKey) {
  const template = aircraftTemplates[aircraftKey]
  if (!template) throw new Error(`Unknown aircraft template: ${aircraftKey}`)

  const seedBase = Array.from(String(flightId)).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const rand = seededRandom(seedBase || 42)

  const rows = []
  for (let row = 1; row <= template.rows; row += 1) {
    const cabin = cabinForRow(template, row)
    const seats = template.layout.map((letter) => {
      if (letter === '') return { type: 'aisle' }
      const isOccupied = rand() < 0.32
      const isExtraLegroom = template.extraLegroomRows.includes(row)
      const isExitRow = template.exitRows.includes(row)
      const basePrice = 40
      const priceDelta = cabin.key === 'economy'
        ? (isExtraLegroom ? 24 : 0)
        : cabin.key === 'premium' ? 60 : 140
      return {
        type: 'seat',
        id: `${row}${letter}`,
        row,
        letter,
        cabin: cabin.key,
        status: isOccupied ? 'occupied' : 'available',
        extraLegroom: isExtraLegroom,
        exitRow: isExitRow,
        priceDelta: basePrice + priceDelta
      }
    })
    rows.push({ row, cabin: cabin.key, seats })
  }

  return {
    aircraft: template.label,
    cabins: template.cabins.map((c) => ({ key: c.key, label: c.label })),
    exitRows: template.exitRows,
    rows
  }
}
