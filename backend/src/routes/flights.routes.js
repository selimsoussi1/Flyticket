import { Router } from 'express'
import { searchFlights, getFlight, getFlightSeatMap } from '../controllers/flightsController.js'

const router = Router()
router.get('/', searchFlights)
router.get('/:id', getFlight)
router.get('/:id/seatmap', getFlightSeatMap)

export default router
