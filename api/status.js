const router = require('koa-router')()
const StatusModel = require('../database/models/status')

// GET /status
// Request the information of users and devices
router.get('/status', async (ctx, next) => {
  const statusTest = StatusModel.aggregate([{ $group: { _id: '$userAgent.osname', num: { $sum: 1 } } }])

  ctx.response.type = 'json'
  ctx.response.body = {
    code: 200,
    data: {
      statusTest
    }
  }

  await next()
})

module.exports = router
