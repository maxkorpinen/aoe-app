const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const civilizations = require('./utils/civstats')
const {punit} = require('./utils/CivUtils')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const civRouter = require('./controllers/civs')
const unitRouter = require('./controllers/units')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use('/api/civs', civRouter)
app.use('/api/units', unitRouter)
app.use(middleware.errorHandler)
console.log("NODE_ENV:", process.env.NODE_ENV)
module.exports = app