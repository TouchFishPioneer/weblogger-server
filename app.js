const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')

const config = require('./config/config')
const sensor = require('./api/sensor')
const log = require('./util/log')

app.use(cors())

app.use(async (ctx, next) => {
  log(4, `Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

app.use(require('./api/pin').routes())

let server = app.listen(config.port, () => {
  sensor(server)
})
log(4, `Demo running at port ${config.port}`)
