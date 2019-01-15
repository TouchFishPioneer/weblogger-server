const router = require('koa-router')()
const StatusModel = require('../database/models/status')

// GET /status
// Request the information of users and devices
router.get('/status', async (ctx, next) => {
  let osName
  let deviceVender
  let engineName

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.osname', total: { $sum: 1 } } }
  ]).then((res) => {
    osName = res
  })

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.devicevender', total: { $sum: 1 } } }
  ]).then((res) => {
    deviceVender = res
  })

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.enginename', total: { $sum: 1 } } }
  ]).then((res) => {
    engineName = res
  })

  ctx.response.type = 'json'
  ctx.response.body = {
    code: 200,
    data: {
      os: osName,
      vender: deviceVender,
      engine: engineName
    }
  }
})

module.exports = router
