const router = require('koa-router')()
const PinModel = require('../database/models/pins')

// GET /pin
// Request the pin array
router.get('/pin', async (ctx, next) => {
  const pins = await PinModel.find()

  ctx.response.type = 'json'
  ctx.response.body = {
    code: 200,
    data: {
      pins: pins[0].pins
    }
  }
})

module.exports = router
