import chalk from 'chalk'
import { daemon } from './daemon'

export function handleError (e) {
  if (e.name === 'RequestError') {
    print(`Could not contact server at ${daemon}`)
  } else if (e.name == 'StatusCodeError') {
    try {
      const error = isObject(e.error) ? e.error.message : JSON.parse(e.error).message
      print(error)
    } catch(err) {
      print(e.message)
    }
  } else {
    print(e.message)
  }
  process.exit(1)
}

function print (err) {
  console.error(chalk.red(err))
}

function isObject(val) {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') )
}
