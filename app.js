const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')

const config = require('./config/config')
const sensor = require('./api/sensor')

app.use(cors())

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

app.use(require('./api/pin').routes())

let server = app.listen(config.port, () => {
  sensor(server)
})
console.log(`[START] demo running at port ${config.port}`)
