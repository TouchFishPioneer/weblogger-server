const database = require('../db')

// Schema and model of collection pin
const pinSchema = new database.Schema({
  time: Date,
  pins: [String]
})

module.exports = database.model('Pin', pinSchema, 'pin')
