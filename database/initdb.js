const mongoose = require('./db')

const pinSchema = new mongoose.Schema({
  time: Date,
  pins: [String]
})

const Pin = mongoose.model('Pin', pinSchema)
