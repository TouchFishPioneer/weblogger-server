const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'hello world!'
})

app.listen(1120)
console.log(`[START] demo running at port 1120`)
