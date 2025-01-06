require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI 

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const dataSchema = new mongoose.Schema({
    year: Number,
    type: String,
    quarter: String,
    actual: Number,
    target: Number,
    variance: Number, 
  })  
  
  module.exports = mongoose.model('Year2020', dataSchema, 'financial_data_2020')