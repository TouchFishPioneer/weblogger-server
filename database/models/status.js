const mongoose = require('../db')

const statusSchema = new mongoose.Schema({
  username: String,
  pinsCount: Number,
  pinsLength: Number,
  userAgent: {
    device: {
      model: String,
      type: String,
      vender: String
    },
    os: {
      name: String,
      version: String
    },
    browser: {
      name: String,
      version: String
    },
    engine: {
      name: String,
      version: String
    }
  }
})

module.exports = mongoose.model('Status', statusSchema, 'status')
