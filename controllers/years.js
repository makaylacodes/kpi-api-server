
const { getYearModel } = require('../models/year')
const router = require('express').Router()

// Root homepage
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1><h4>Please use a more specific route, like /api/year, to view specific financial data</h4>')
})

// Get data for a specific year
router.get('/:year', (request, response, next) => {
    const year = request.params.year
    // passes in the year that the user entered, based on this variable the appropriate year collection is loaded
    const Year = getYearModel(year)

    // Returns all documents with the specified year
    Year.find({ year: parseInt(year) })
    .then(years => {
      if (years.length === 0) {
        const error = new Error(`No data found for year ${year}, please choose a year between 2020 - 2024`)
        error.status = 404
        return next(error)
      }
      response.json(years)
    })
    .catch (error => next(error))
})

// Get data for a specific year and quarter
router.get('/:year/quarter/:quarter', (request, response, next) => {
    const year = request.params.year
    const quarter = request.params.quarter
    const Year = getYearModel(year)

    Year.find({ year: parseInt(year), quarter: quarter }).then(quarters => {
      if (quarters.length === 0) {
        const error = new Error(`No data found for quarter ${quarter}, please choose a year between q1 - q4`)
        error.status = 404
        return next(error)
      }
      response.json(quarters)
    })
    .catch (error => next(error))
})

// Get data for a specific type (e.g., revenue, grossProfit) in a specific year
router.get('/:year/:type', (request, response, next) => {
    const year = request.params.year
    const type = request.params.type
    const Year = getYearModel(year)

    Year.find({ year: parseInt(year), type: type }).then(types => {
        if (types.length === 0) {
            const error = new Error(`No data found for type ${type}, please choose one of the following types: revenue, timesheets, grossProfit, netProfit, or utilRates.`)
            error.status = 404
            return next(error)
        }
        response.json(types)
    })
    .catch (error => next(error))
})

module.exports = router
