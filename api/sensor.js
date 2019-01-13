const ws = require('ws')
const WebSocketServer = ws.Server

function sensorDataSocket (server) {
  let webSocketServer = new WebSocketServer({
    server: server
  })

  webSocketServer.on('connection', socket => {
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
