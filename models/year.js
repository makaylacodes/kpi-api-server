const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
  year: Number,
  type: String,
  quarter: String,
  actual: Number,
  target: Number,
  variance: Number,
})

// Function to dynamically create a model for a given collection
const getYearModel = (year) => {
  const collectionName = `financial_data_${year}`
  return mongoose.model(`Year${year}`, dataSchema, collectionName)
}

module.exports = { getYearModel }
 