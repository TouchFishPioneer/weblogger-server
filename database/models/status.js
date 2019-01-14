const mongoose = require('../db')

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
