require('dotenv').config()

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  // Logs success message in the console and says the port, which is an environment variable
  logger.info(`Server running on port ${config.PORT}`)
})
