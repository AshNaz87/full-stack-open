const logger = require('./logger')

const requestLogger = (request, _, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_, response) =>
  response.status(404).send({ error: 'Unknown endpoint'})

const errorHandler = (error, _, response, next) => {

  if (error.name === 'CastError' && error.kind === 'ObjectId')
  return response.status(400).send({ error: 'Malformatted ID'})

  if (error.name === 'ValidationError')
  return response.status(400).json({ error: error.message })

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor = (request, _, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  next()
  return request.token
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}
