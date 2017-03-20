#!/usr/bin/env node

import program from 'commander'
import { seed } from './daemon'
import path from 'path'
import { handleError } from './error'

program.parse(process.argv)

if (program.args.length < 4) {
  console.log('Usage : seed <path> <desc> <name> <cat>')
  process.exit(0)
}

const videoPath = program.args[0]
const desc = program.args[1]
const name = program.args[2]
const categories = program.args[3]

(async() => {
  try {
    const res = await seed(path.normalize(videoPath), desc, name, categories)
    console.log('Seeding ' + res.torrentHashInfo)
  } catch (err) {
    handleError(err)
  }
})()
