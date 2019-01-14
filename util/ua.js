const Uaparser = require('ua-parser-js')

function userAgentObject (userAgent) {
  let parser = new Uaparser()
  parser.setUA(userAgent)
  let result = parser.getResult()
  let uaObject = {
    device: {
      model: result.device.model,
      type: result.device.type,
      vender: result.device.vendor
    },
    os: {
      name: result.os.name,
      version: result.os.version
    },
    browser: {
      name: result.browser.name,
      version: result.browser.version
    },
    engine: {
      name: result.engine.name,
      version: result.engine.version
    }
  }

  return uaObject
}

module.exports = userAgentObject
