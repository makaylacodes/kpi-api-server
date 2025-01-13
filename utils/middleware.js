const logger = require('./logger')
const morgan = require('morgan')

morgan.token('datetime', () => new Date().toLocaleString())
morgan.token('method', (req) => req.method)
morgan.token('path', (req) => req.originalUrl)
morgan.token('status', (req, res) => res.statusCode)
morgan.token('content-length', (req, res) => res.getHeader('Content-Length'))
morgan.token('response-time', (req, res) => `${res.getHeader('X-Response-Time')} ms`)


// Morgan logging setup with custom tokens and format
const morganLogger = morgan(':datetime - Method: :method - Path: :path - Status: :status - Content Length: :content-length - Response Time: :response-time')

/* This is an http request logger, however decided to use morgan for http logging
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
} */

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  // requestLogger,
  morganLogger,
  unknownEndpoint,
  errorHandler
}