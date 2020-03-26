const database = require('../db')

// Schema and model of collection sensor
const sensorSchema = new database.Schema({
  username: String,
  sampleId: String,
  pin: String,
  time: Date,

  data: {
    acc_x: Number,
    acc_y: Number,
    acc_z: Number,

    gacc_x: Number,
    gacc_y: Number,
    gacc_z: Number,

    rot_alpha: Number,
    rot_beta: Number,
    rot_gamma: Number,

    ori_gamma: Number,
    ori_beta: Number,
    ori_alpha: Number,

    interval: Number
  }
})

module.exports = database.model('Sensor', sensorSchema, 'sensor')
