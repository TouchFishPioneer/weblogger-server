const chalk = require('chalk')

exports.logParser = (level, msg) => {
  if (level === 1) {
    console.log(chalk.bgGreen.black('[SUCCESS]') + ' ' + chalk.green(msg))
  } else if (level === 2) {
    console.log(chalk.bgYellow.black('[WARNING]') + ' ' + chalk.yellow(msg))
  } else {
    console.log(chalk.bgRed.black('[ ERROR ]') + ' ' + chalk.red(msg))
  }
}
