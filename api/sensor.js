const io = require('socket.io')
const SensorModel = require('../database/models/sensor')
const log = require('../util/log')

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
      let sensorInstance = new SensorModel(data)
      sensorInstance.deleteMany({
        sampleId: data.sampleId,
        pin: data.pin
      }, err => {
        if (err) {
          log(3, 'Error occured when rolling back wrong data from database.')
        }
      })
    })

    socket.on('log-complete', () => {
      log(1, 'log complete!')
    })
  })
}

module.exports = sensorDataSocket
