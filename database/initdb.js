const PinModel = require('./models/pins')
const mongoose = require('./db')
const pinGenerator = require('../util/pin')
const log = require('../util/log')

let N = 50
let K = 4
if (process.argv.length === 4) {
  N = parseInt(process.argv[2])
  K = parseInt(process.argv[3])
}
let pinArray = pinGenerator.getValidPins(N, K)

let pin = new PinModel({
  time: new Date(),
  pins: pinArray
})

PinModel.deleteMany({}, err => {
  if (err) {
    log(3, `Error occurs in dropping old collection of pins, ${err}`)
  } else {
    pin.save((err, res) => {
      if (err) {
        log(3, `Error occurs in insert new pins into database, ${err}`)
      } else {
        log(1, `${res.pins.length} pins have been inserted into the database.`)
        mongoose.disconnect()
      }
    })
  }
})
