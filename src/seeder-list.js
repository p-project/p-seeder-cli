#!/usr/bin/env node

import { list, info } from './daemon'
import { handleError } from './error'

(async() => {
  try {
    const torrents = await list()
    torrents.forEach(async (t) => {
      const i = await info(t)
      console.log(`${(i.progress * 100).toFixed(0)}% ${i.infoHash} ${i.name}`)
    })
  } catch (e) {
    handleError(e)
  }
})()
