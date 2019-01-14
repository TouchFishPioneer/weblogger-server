const io = require('socket.io')

function sensorDataSocket (server) {
  const webSocketServer = io(server)

  webSocketServer.on('connection', socket => {
    console.log('websocket connection success!')
    socket.on('sensor', data => {
      console.log(`sensor:
        sampleid: ${data.sampleId},
        pin: ${data.pin}`)
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
