import { asyncHandler } from '../utils/asyncHandler.js'
import { searchAirports } from '../data/airports.js'

export const listAirports = asyncHandler(async (req, res) => {
  const { q } = req.query
  res.json({ airports: searchAirports(q) })
})
