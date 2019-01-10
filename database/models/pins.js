const mongoose = require('../db')

const pinSchema = new mongoose.Schema({
  time: Date,
  pins: [String]
})

module.exports = mongoose.model('Pin', pinSchema, 'pins')
