const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const yearsRouter = require('./controllers/years')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
require('dotenv').config()

const app = express()

// MongoDB connection
mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

// Middleware setup 
app.use(cors())
app.use(express.json())
// app.use(middleware.requestLogger)
app.use(middleware.morganLogger)

// Routes
app.use('/api', yearsRouter)

// Error handling middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
