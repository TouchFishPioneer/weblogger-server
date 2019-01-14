const io = require('socket.io')
const log = require('../util/log')
const uaParser = require('../util/ua')
const SensorModel = require('../database/models/sensor')
const StatusModel = require('../database/models/status')

function sensorDataSocket (server) {
  const webSocketServer = io(server)

  webSocketServer.on('connection', socket => {
    log(1, 'Websocket connection success!')

    socket.on('sensor', data => {
      let sensorInstance = new SensorModel(data)
      sensorInstance.save(err => {
        if (err) {
          log(3, 'Error occured when inserting new data into database.')
        }
      })
    })

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

    socket.on('log-complete', data => {
      log(1, 'log complete!')
      data.userAgent = uaParser(data.userAgent)
      let statusInstance = new StatusModel(data)
      statusInstance.save(err => {
        if (err) {
          log(3, 'Error occured when inserting new user information into database.')
        } else {
          log(1, `Log complete and user ${data.username}'s information has been recorded.`)
        }
      })
    })
  })
}

module.exports = sensorDataSocket
