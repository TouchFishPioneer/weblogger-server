const Uaparser = require('ua-parser-js')

// Parse the user-agent strings into objects
function userAgentObject (userAgent) {
  const parser = new Uaparser()
  parser.setUA(userAgent)
  const result = parser.getResult()
  const uaObject = {
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
