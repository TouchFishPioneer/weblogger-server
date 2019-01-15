const router = require('koa-router')()
const StatusModel = require('../database/models/status')

// GET /status
// Request the information of users and devices
router.get('/status', async (ctx, next) => {
  ctx.response.type = 'json'
  StatusModel.aggregate([{
    $group: {
      _id: '$userAgent.osname',
      total: {
        $sum: 1
      }
    }
  }]).then((res) => {
    ctx.response.body = {
      code: 200,
      data: {
        res
      }
    }
  })
})

module.exports = router
