const mongoose = require('../db')

// Schema and model of collection status
const statusSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Status', statusSchema, 'status')
