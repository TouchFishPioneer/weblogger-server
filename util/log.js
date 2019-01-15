const chalk = require('chalk')

// Unify the style of logs
function logParser (level, msg) {
  switch (level) {
    case 1:
      console.log(chalk.bgGreen.black('[SUCCESS]') + ' ' + chalk.green(msg))
      break
    case 2:
      console.log(chalk.bgYellow.black('[WARNING]') + ' ' + chalk.yellow(msg))
      break
    case 3:
      console.log(chalk.bgRed.black('[ ERROR ]') + ' ' + chalk.red(msg))
      break
    case 4:
      console.log(chalk.bgBlue.black('[ INFOM ]') + ' ' + chalk.blue(msg))
      break
    default:
      console.log(chalk.bgWhite.black('[ OTHER ]') + ' ' + chalk.white(msg))
  }
}

module.exports = logParser
