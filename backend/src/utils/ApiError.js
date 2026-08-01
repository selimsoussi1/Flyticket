export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.details = details
  }

  static badRequest(message, details) {
    return new ApiError(400, message, details)
  }

  static notFound(message) {
    return new ApiError(404, message)
  }

  static conflict(message) {
    return new ApiError(409, message)
  }
}
