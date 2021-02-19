// @ts-ignore
import PlexAPI from 'plex-api'
import yargs from 'yargs'
// @ts-ignore
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).options({
  hostname: {
    alias: 'h',
    type: 'string',
    desc: 'hostname of the plex server connecting to',
    default: '127.0.0.1',
  },
  port: {
    alias: 'p',
    type: 'number',
    desc: 'port that the plex server listens on',
    default: 32400,
  },
  secure: {
    alias: 's',
    type: 'boolean',
    desc: 'set to connect over HTTPS instead of just HTTP',
    default: false,
  },
  username: {
    alias: 'u',
    type: 'string',
    desc: 'username to authenticate against plex server',
  },
  password: {
    alias: 'w',
    type: 'string',
    desc: 'password to authenticate against plex server',
  },
  identifier: {
    alias: 'i',
    type: 'string',
    desc: 'unique identifier sent to plex server, used to remember requests',
    defaultDescription: 'a generated uuid v4',
  },
  deviceName: {
    alias: 'n',
    type: 'string',
    desc: 'name of the device sent to plex server for human-readable identification ',
  },
}).argv

const client = new PlexAPI({
  hostname: argv.hostname,
  port: argv.port,
  https: argv.secure,
  username: argv.username,
  password: argv.password,
  options: {
    identifier: argv.identifier,
    deviceName: argv.deviceName,
  },
})

client.query('/').then(
  (result: any) => {
    console.log(`Plex Media Server Version: '${result.MediaContainer.version}'`)
  },
  (error: any) => {
    console.error(error)
  }
)
