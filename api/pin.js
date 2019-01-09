const router = require('koa-router')()

router.get('/pin', async (ctx, next) => {
  ctx.response.type = 'json'
  ctx.response.body = {
    code: '200',
    data: {
      pins: [1, 3, 4, 5]
    }
  }
})

module.exports = router
