const router = require('koa-router')()
const StatusModel = require('../database/models/status')

// GET /status
// Request the information of users and devices
router.get('/status', async (ctx, next) => {
  let osName
  let deviceVender
  let engineName

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.osname', name: '$userAgent.osname', value: { $sum: '$pinsCount' } } }
  ]).then((res) => {
    osName = res
  })

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.devicevender', name: '$userAgent.devicevender', total: { $sum: '$pinsCount' } } }
  ]).then((res) => {
    deviceVender = res
  })

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.enginename', name: '$userAgent.enginename', total: { $sum: '$pinsCount' } } }
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
