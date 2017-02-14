#!/usr/bin/env node

import program from 'commander'

program
  .version('0.0.1')
  .command('add', 'Add a torrent.').alias('a')
  .command('list', 'Show all known torrents.').alias('ls')
  .command('status', 'Show a torrent\'s status.').alias('st')
  .command('remove', 'Remove a torrent.').alias('rm')
  .command('seed <path> <desc> <name> <cat>', 'Seed a new torrent')
  .command('status', 'Show status of a specific torrent.')
  .parse(process.argv)
