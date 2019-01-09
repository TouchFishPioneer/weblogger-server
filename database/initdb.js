const mongoose = require('./db')
const pinGenerator = require('../util/pin')
const chalk = require('chalk')

const pinSchema = new mongoose.Schema({
  time: Date,
  pins: [String]
})

let N = 50
let K = 4
let pinArray = pinGenerator.getValidPins(N, K)

const Pin = mongoose.model('Pin', pinSchema, 'pins')

let pin = new Pin({
  time: new Date(),
  pins: pinArray
})

Pin.deleteMany({}, err => {
  if (err) {
    console.log(chalk.red(`[ERROR] Error occurs in dropping old collection of pins, ${err}`))
  } else {
    pin.save((err, res) => {
      if (err) {
        console.log(chalk.red(`[ERROR] Error occurs in insert new pins into database, ${err}`))
      } else {
        console.log(res)
      }
    })
  }
})
