const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const { getYearModel } = require('./models/db')

app.use(express.json())
app.use(cors())

// Middleware that logs data about http request in the terminal
const requestLogger = (request, response, next) => {
    const currentDateTime = new Date().toLocaleString()
    console.log('Date & Time:', currentDateTime)
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
  app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1><h4>Please use a more specific route, like /api/year, to view specific financial data</h4>')
});

// Get data for a specific year
app.get('/api/:year', async (request, response) => {
  const year = request.params.year

  // Validate year input
  if (!/^\d{4}$/.test(year)) {
    return response.status(400).json({ error: 'Invalid year format' })
  }

  try {
    const YearModel = getYearModel(year)
    const data = await YearModel.find({ year: parseInt(year) })
    response.json(data)
  } catch (error) {
    console.error('Error fetching year data:', error);
    response.status(500).json({ error: 'Internal server error' })
  }
});

// Get data for a specific year and quarter
app.get('/api/:year/quarter/:quarter', async (request, response) => {
  const year = request.params.year
  const quarter = request.params.quarter

  // Validate year and quarter input
  if (!/^\d{4}$/.test(year) || !/^q[1-4]$/.test(quarter)) {
    return response.status(400).json({ error: 'Invalid year or quarter format' })
  }

  try {
    const YearModel = getYearModel(year);
    const data = await YearModel.find({ year: parseInt(year), quarter: quarter })
    response.json(data)
  } catch (error) {
    console.error('Error fetching year and quarter data:', error)
    response.status(500).json({ error: 'Internal server error' })
  }
})

// Get data for a specific type - revenue, grossProfit etc
app.get('/api/:year/:type', async (request, response) => {
    const year = request.params.year
    const type = request.params.type
  
    // Validate year and quarter input
    if (!/^\d{4}$/.test(year)) {
      return response.status(400).json({ error: 'Invalid year or quarter format' })
    }
  
    try {
      const YearModel = getYearModel(year);
      const data = await YearModel.find({ year: parseInt(year), type: type })
      response.json(data)
    } catch (error) {
      console.error('Error fetching year and quarter data:', error)
      response.status(500).json({ error: 'Internal server error' })
    }
  })

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 