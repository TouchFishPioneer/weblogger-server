const chalk = require('chalk')
const mongoose = require('mongoose')
const config = require('../config/config')

const dbURL = `mongodb://${config.database.host}:${config.database.port}/${config.database.dbname}`

mongoose.connect(dbURL, error => {
  if (error) {
    console.log(chalk.red('[ERROR] Database connection error!'), error)
  } else {
    console.log(chalk.green('[SUCCESS] Database connection success!'))
  }
})

mongoose.connection.on('connected', () => {
  console.log(chalk.green('MongoDB successfully connected.'))
})
mongoose.connection.on('error', () => {
  console.log(chalk.red('MongoDB connected error.'))
})
mongoose.connection.on('disconnected', () => {
  console.log(chalk.yellow('MongoDB connected disconnected.'))
})

module.exports = mongoose
