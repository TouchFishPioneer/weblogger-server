const chalk = require('chalk')

function logParser (logLevel, logMsg) {
  switch (logLevel) {
    case 1:
      console.log(chalk.bgGreen.black('[SUCCESS]') + ' ' + chalk.green(logMsg))
      break
    case 2:
      console.log(chalk.bgYellow.black('[WARNING]') + ' ' + chalk.yellow(logMsg))
      break
    case 3:
      console.log(chalk.bgRed.black('[ ERROR ]') + ' ' + chalk.red(logMsg))
      break
    case 4:
      console.log(chalk.bgBlue.black('[ INFOR ]') + ' ' + chalk.blue(logMsg))
      break
    default:
      console.log(chalk.bgRed.black('[ FATAL ]') + ' ' + chalk.red('Wrong log message level.'))
  }
}

module.exports = logParser
