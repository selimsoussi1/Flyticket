import { ApiError } from '../utils/ApiError.js'

export function notFound(req, res, next) {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} does not exist.`))
}

export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const statusCode = err instanceof ApiError ? err.statusCode : 500
  const message = statusCode === 500 && process.env.NODE_ENV === 'production'
    ? 'Something went wrong on our end.'
    : err.message

  if (statusCode === 500) {
    console.error('[unhandled error]', err)
  }

  res.status(statusCode).json({
    error: {
      message,
      details: err.details || undefined
    }
  })
}
