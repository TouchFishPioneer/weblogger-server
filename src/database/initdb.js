const PinModel = require('./model/pin')
const database = require('./db')
const pinGenerator = require('../utils/pin')
const log = require('../utils/log')

// Specify the amount and length of pins by default or command line argument
// N: the amount of pins
// K: the length of each pin
let N = 50
let K = 4
if (process.argv.length === 4) {
  N = parseInt(process.argv[2])
  K = parseInt(process.argv[3])
}
const pinArray = pinGenerator.getValidPins(N, K)

// Initialize the collection of pins in database
PinModel.deleteMany({}, err => {
  if (err) {
    log(3, `Error occurs in dropping old collection of pins, ${err}`)
  } else {
    const pin = new PinModel({
      time: new Date(),
      pins: pinArray
    })
    pin.save((err, res) => {
      if (err) {
        log(3, `Error occurs in insert new pins into database, ${err}`)
      } else {
        log(1, `${res.pins.length} pins have been inserted into the database.`)
        database.disconnect()
      }
    })
  }
})
