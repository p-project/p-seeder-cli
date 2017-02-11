#!/usr/bin/env node

import program from 'commander'
import { seed } from './daemon'
import path from 'path'

program.parse(process.argv)

const videoPath = program.args[0]
const desc = program.args[1]
const name = program.args[2]
const categories = program.args[3]

seed(path.normalize(videoPath), desc, name, categories).then((res) => {
  console.log('Seeding ' + res.torrentHashInfo)
})
