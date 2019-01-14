const Uaparser = require('ua-parser-js')

function userAgentObject (userAgent) {
  let parser = new Uaparser()
  parser.setUA(userAgent)
  let result = parser.getResult()
  let uaObject = {
    devicemodel: result.device.model,
    devicetype: result.device.type,
    devicevender: result.device.vendor,
    osname: result.os.name,
    osversion: result.os.version,
    browsername: result.browser.name,
    browserversion: result.browser.version,
    enginename: result.engine.name,
    engineversion: result.engine.version
  }

  return uaObject
}

module.exports = userAgentObject
