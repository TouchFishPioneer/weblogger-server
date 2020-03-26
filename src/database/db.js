const mongo = require('mongoose')
const config = require('../config/config')
const log = require('../utils/log')

const databaseUrl = `mongodb://${config.database.host}:${config.database.port}/${config.database.dbname}`

mongo.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, error => {
  if (error) {
    log(3, `Database connecting failed. ${error}`)
  }
})

mongo.connection.on('connected', () => {
  log(1, 'Database connection established.')
})
mongo.connection.on('error', () => {
  log(3, 'Database connection is in error.')
})
mongo.connection.on('disconnected', () => {
  log(1, 'Database connection closed.')
})

module.exports = mongo
