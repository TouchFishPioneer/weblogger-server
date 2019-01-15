const mongoose = require('../db')

// Schema and model of collection pins
const pinSchema = new mongoose.Schema({
  time: Date,
  pins: [String]
})

module.exports = mongoose.model('Pin', pinSchema, 'pins')
