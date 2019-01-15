const router = require('koa-router')()
const StatusModel = require('../database/models/status')

// GET /status
// Request the information of users and devices
router.get('/status', async (ctx, next) => {
  let statusStatistics
  StatusModel.aggregate([{
    $group: {
      _id: '$userAgent.$osname',
      total: {
        $sum: 1
      }
    }
  }]).then((res) => {
    statusStatistics = res
  })

  ctx.response.type = 'json'
  ctx.response.body = {
    code: 200,
    data: {
      statusStatistics
    }
  }
})

module.exports = router
