const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const civRouter = require('./controllers/civs')
const unitRouter = require('./controllers/units')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const matchRouter = require('./controllers/matches')
const matchupRouter = require('./controllers/matchup')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/civs', civRouter)
app.use('/api/units', unitRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/matches', matchRouter)
app.use('/api/matchup', matchupRouter)
if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.use(express.static('build'))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app