import chalk from 'chalk'
import { daemon } from './daemon'

export function handleError (e) {
  if (e.name === 'RequestError') {
    print(`Could not contact server at ${daemon}`)
  } else if (e.name == 'StatusCodeError') {
    print(`Server answered with status code ${e.statusCode}`)
  } else {
    console.log(e.message)
  }
  process.exit(1)
}

function print (err) {
  console.error(chalk.red(err))
}
