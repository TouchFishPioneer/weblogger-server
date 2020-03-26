const router = require('koa-router')()
const StatusModel = require('../database/model/status')

// GET /status
// Request the information of users and devices
router.get('/status', async (ctx, next) => {
  let osName
  let deviceVender
  let engineName

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.osname', value: { $sum: '$pinsCount' } } }
  ]).then((res) => {
    osName = res
  })

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.devicevender', value: { $sum: '$pinsCount' } } }
  ]).then((res) => {
    deviceVender = res
  })

  await StatusModel.aggregate([
    { $group: { _id: '$userAgent.enginename', value: { $sum: '$pinsCount' } } }
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
