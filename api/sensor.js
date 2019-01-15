const io = require('socket.io')
const log = require('../util/log')
const uaParser = require('../util/ua')
const SensorModel = require('../database/models/sensor')
const StatusModel = require('../database/models/status')

/**
 * Establish a websocket for sensor data transmission
 * @param {Object} server A HTTP server
 */
function sensorDataSocket (server) {
  const webSocketServer = io(server)

  // Connection establishment
  webSocketServer.on('connection', socket => {
    log(1, 'Websocket connection success!')

    // Register sensor listener
    // Receive sensor data
    socket.on('sensor', data => {
      let sensorInstance = new SensorModel(data)
      sensorInstance.save(err => {
        if (err) {
          log(3, `Error occured when inserting new data into database. Error message: ${err}`)
        }
      })
    })

    // Register rollback listener
    // Receive a signal to rollback specified database entry
    socket.on('rollback', data => {
      SensorModel.deleteMany({
        sampleId: data.sampleId,
        pin: data.pin
      }, err => {
        if (err) {
          log(3, 'Error occured when rolling back wrong data from database.')
        } else {
          log(1, `Wrong sensor recordings have been removed successfully. Pin: ${data.pin}, SampleID: ${data.sampleId}.`)
        }
      })
    })

    // Register log complete listener
    // Record the information of users and devices
    socket.on('log-complete', data => {
      data.userAgent = uaParser(data.userAgent)
      let statusInstance = new StatusModel(data)
      statusInstance.save(err => {
        if (err) {
          log(3, `Error occured when inserting new user information into database. Error message: ${err}`)
        } else {
          log(1, `Log complete and user ${data.username}'s information has been recorded.`)
        }
      })
    })
  })
}

module.exports = sensorDataSocket
