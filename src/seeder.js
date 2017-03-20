#!/usr/bin/env node

import program from 'commander'
import path from 'path'
import { add, seed, list, info, remove } from './daemon'
import { handleError } from './error'

program
  .command('add <tid...>')
  .description('Add torrents.')
  .action((tid) => tid.forEach(async (arg) => {
    try {
      const res = await add(arg)
      console.log('Added ' + res)
    } catch (e) {
      handleError(e)
    }
  }))

program
  .command('list')
  .description('Show all known torrents.')
  .action(async() => {
    try {
      const torrents = await list()
      torrents.forEach(async (t) => {
        const i = await info(t)
        console.log(`${(i.progress * 100).toFixed(0)}% ${i.infoHash} ${i.name}`)
      })
    } catch (e) {
      handleError(e)
    }
  })

program
  .command('remove <tid...>')
  .description('Remove torrents.')
  .action((tid) => tid.forEach(async (arg) => {
    try {
      await remove(arg)
      console.log('Removed ' + arg)
    } catch (err) {
      handleError(err)
    }
  }))

program
  .command('status <tid...>')
  .description('Show the status of torrents.')
  .option('-d --debug', 'Print complete status in JSON')
  .action((tid) =>
    program.args.forEach(async (arg) => {
      try {
        const i = await info(arg)
        if (program.debug) {
          console.log(JSON.stringify(i, null, 2))
        } else {
          prettyPrint(i)
        }
      } catch (err) {
        handleError(err)
      }
    })
  )

program
  .command('seed <path> <description> <name> <category>')
  .description('Seed a new torrent')
  .action(async(path, description, name, category) => {
    try {
      const res = await seed(path.normalize(path), description, name, category)
      console.log('Seeding ' + res.torrentHashInfo)
    } catch (err) {
      handleError(err)
    }
  })


program.parse(process.argv)

if(program.args.length < 1){
  program.help()
}

function prettyPrint (info) {
  let remaining = info.timeRemaining === 0 ? ''
    : `${humanizeDuration(info.timeRemaining, { round: true })} remaining\n`

  console.log(`${info.name}
${info.infoHash}
${prettySize(info.downloaded)} / ${prettySize(info.length)}
${remaining}${info.numPeers} peers connected`
  )
}
