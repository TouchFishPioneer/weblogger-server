const io = require('socket.io')
const SensorModel = require('../database/models/sensor')

function sensorDataSocket (server) {
  const webSocketServer = io(server)

  webSocketServer.on('connection', socket => {
    console.log('websocket connection success!')

    socket.on('sensor', data => {
      let sensorInstance = new SensorModel(data)
      sensorInstance.save((err, res) => {
        if (err) {
          console.log('error occured during inserting new data.')
        }
      })
    })

    socket.on('rollback', data => {
      console.log(`rollback:
        sampleId: ${data.sampleId},
        pin: ${data.pin}`)
    })

    socket.on('log-complete', data => {
      console.log('log complete!')
    })
  })
}

module.exports = sensorDataSocket
