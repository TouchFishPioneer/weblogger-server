const router = require('koa-router')()
const StatusModel = require('../database/models/status')

// GET /status
// Request the information of users and devices
router.get('/status', async (ctx, next) => {
  let result
  StatusModel.aggregate([{
    $group: {
      _id: '$username',
      num: {
        $sum: 1
      }
    }
  }], (err, res) => {
    if (err) {
      console.log(err)
    } else {
      result = res
    }
  })

  ctx.response.type = 'json'
  ctx.response.body = {
    code: 200,
    data: {
      result
    }
  }

  await next()
})

module.exports = router
