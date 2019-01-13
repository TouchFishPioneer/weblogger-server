const io = require('socket.io')

function sensorDataSocket (server) {
  const webSocketServer = io(server)

  webSocketServer.on('connection', socket => {
    console.log('websocket connection success!')
    socket.on('sensor', data => {
      console.log('sensor data come!')
    })

    socket.on('rollback', data => {
      console.log('rollback instruction come!')
    })

    socket.on('log-complete', data => {
      console.log('log complete!')
    })
  })
}

module.exports = sensorDataSocket
