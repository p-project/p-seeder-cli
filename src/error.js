import chalk from 'chalk'
import { daemon } from './daemon'

export function handleError (e) {
  if (e.name === 'RequestError') {
    fail(`Could not contact server at ${daemon}`)
  } else if (e.name == 'StatusCodeError') {
    try {
      const error = isObject(e.error) ? e.error.message : JSON.parse(e.error).message
      fail(error)
    } catch(err) {
      fail(e.message)
    }
  } else {
    fail(e.message)
  }
}

function fail (err) {
  console.error(chalk.red(err))
  process.exit(1)
}

function isObject(val) {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') )
}
