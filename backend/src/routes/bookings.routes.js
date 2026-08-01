import { Router } from 'express'
import { postBooking, getBookingByPnr, getAllBookings } from '../controllers/bookingsController.js'

const router = Router()
router.get('/', getAllBookings)
router.post('/', postBooking)
router.get('/:pnr', getBookingByPnr)

export default router
