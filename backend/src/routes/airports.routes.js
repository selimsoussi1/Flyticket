import { Router } from 'express'
import { listAirports } from '../controllers/airportsController.js'

const router = Router()
router.get('/', listAirports)

export default router
