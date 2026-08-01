import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import airportsRoutes from './routes/airports.routes.js'
import flightsRoutes from './routes/flights.routes.js'
import bookingsRoutes from './routes/bookings.routes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
  app.use(express.json())
  app.use(morgan('dev'))

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'dptr-backend', time: new Date().toISOString() })
  })

  app.use('/api/airports', airportsRoutes)
  app.use('/api/flights', flightsRoutes)
  app.use('/api/bookings', bookingsRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
