const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())
const Year2020 = require('./models/year2020')

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/2020', (request, response) => {
    try{
        Year2020.find({year:2020}).then(year => {
            console.log("These are objects from: ", year)
            response.json(notes)
        })
        }
    catch (error){
        console.log("This is error message: ", error)
    }
})

app.get('/api/2020/:quarter', (request, response) => {
    const quarter = request.params.quarter
    
})


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)