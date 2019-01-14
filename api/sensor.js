const io = require('socket.io')
const SensorModel = require('../database/models/sensor')
const log = require('../util/log')

function sensorDataSocket (server) {
  const webSocketServer = io(server)

  webSocketServer.on('connection', socket => {
    log(1, 'Websocket connection success!')

    socket.on('sensor', data => {
      let sensorInstance = new SensorModel(data)
      sensorInstance.save((err, res) => {
        if (err) {
          log(3, 'Error occured when inserting new data into database.')
        }
      })
    })

    socket.on('rollback', data => {
      console.log(`rollback:
        sampleId: ${data.sampleId},
        pin: ${data.pin}`)
    })

    socket.on('log-complete', data => {
      log(1, 'log complete!')
    })
  })
}

module.exports = sensorDataSocket
