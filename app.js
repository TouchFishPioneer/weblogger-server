const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const config = require('./config/config')
const log = require('./util/log')
const pinRoute = require('./api/pin')
const sensorRoute = require('./api/sensor')
const statusRoute = require('./api/status')

// Configures the Access-Control-Allow-Origin CORS header
app.use(cors())

// Log the API request
app.use(async (ctx, next) => {
  log(4, `Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

// Register routing events
app.use(pinRoute.routes())
app.use(statusRoute.routes())
let server = app.listen(config.port, () => {
  sensorRoute(server)
})

log(4, `Demo running at port ${config.port}`)
