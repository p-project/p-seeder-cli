#!/usr/bin/env node

import program from 'commander'
import humanizeDuration from 'humanize-duration'
import prettySize from 'prettysize'
import { info } from './daemon'
import { handleError } from './error'

program
  .option('-d --debug', 'Print complete status in JSON')
  .parse(process.argv)

try {
  program.args.forEach(async (arg) => {
    const i = await info(arg)
    if (program.debug) {
      console.log(JSON.stringify(i, null, 2))
    } else {
      prettyPrint(i)
    }
  })
} catch (err) {
  handleError(err)
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
