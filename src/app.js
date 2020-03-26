const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')

const config = require('./config/config')
const log = require('./utils/log')

const pinRoute = require('./api/pin')
const statusRoute = require('./api/status')
const sensorRoute = require('./api/sensor')

// Configure the Access-Control-Allow-Origin CORS header
app.use(cors())

// Log the API request
app.use(async (ctx, next) => {
  log(4, `Request ${ctx.request.method} ${ctx.request.url} from ${ctx.request.ip}`)
  await next()
})

// Register routing events
app.use(pinRoute.routes())
app.use(statusRoute.routes())
const server = app.listen(config.port, () => {
  sensorRoute(server)
})

log(4, `Server running at port ${config.port}`)
