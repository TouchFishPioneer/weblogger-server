const mongoose = require('../db')

const sensorSchema = new mongoose.Schema({
  time: Date,
  pins: [String]
})

module.exports = mongoose.model('Sensor', sensorSchema, 'sensor')
