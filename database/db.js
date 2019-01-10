const mongoose = require('mongoose')
const config = require('../config/config')
const log = require('../util/log')

const dbURL = `mongodb://${config.database.host}:${config.database.port}/${config.database.dbname}`

mongoose.connect(dbURL, { useNewUrlParser: true }, error => {
  if (error) {
    log.logParser(3, `Database connection error! ${error}`)
  } else {
    log.logParser(1, `Database connection success!`)
  }
})

mongoose.connection.on('connected', () => {
  log.logParser(1, `MongoDB successfully connected.`)
})
mongoose.connection.on('error', () => {
  log.logParser(3, `MongoDB connection is in error.`)
})
mongoose.connection.on('disconnected', () => {
  log.logParser(2, `MongoDB database is disconnected.`)
})

module.exports = mongoose
