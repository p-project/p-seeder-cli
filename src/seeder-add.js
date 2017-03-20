#!/usr/bin/env node

import program from 'commander'
import { add } from './daemon'
import { handleError } from './error'

program.parse(process.argv)

program.args.forEach(async (arg) => {
  try {
    const res = await add(arg)
    console.log('Added ' + res)
  } catch (e) {
    handleError(e)
  }
})
