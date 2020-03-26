const database = require('../db')

// Schema and model of collection status
const statusSchema = new database.Schema({
  username: String,
  pinsCount: Number,
  pinsLength: Number,
  userAgent: {
    devicemodel: String,
    devicetype: String,
    devicevender: String,

    osname: String,
    osversion: String,

    browsername: String,
    browserversion: String,

    enginename: String,
    engineversion: String
  }
})

module.exports = database.model('Status', statusSchema, 'status')
