const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../schemas/user')

const unknownEndpoint = (request, response) => {
  console.log("UNKNONWENDPOINT")
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log("ERRORHANDLER")
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error:'token expired'
    })
  }

  next(error)
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (req, res, next) => {
  if(req.path=='/api/matches/winsagainst/') {
    console.log("body:",req.body)
    console.log("data:",req.data)
    console.log("params: ",req.params)
    console.log("query:", req.query)
    //console.log(req)
  }
  req.token = getTokenFrom(req)
  //console.log("tktktk",req.token)
  next()
}

const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req)
  
  if(token) {
    try{
      const decoToken = jwt.verify(token, process.env.SEKRET)
      req.user = await User.findById(decoToken.id)
    } catch(err) {
      console.log("KESKELLÄ")
      next(err)
      return
    }
    
    /* if (!decoToken.id) {
      return response.status(401).json({error: 'invalid token'})
    } */
    //req.user = await User.findById(decodedToken.id)
  }
  console.log("LOPPUSSA")
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}