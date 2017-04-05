// @flow
import winston from 'winston'
import config from '../config/config.json'
const env = process.env.NODE_ENV || 'development'
const logLevel = config[env].logLevel || 'debug'
let log

if (!log) {
  winston.level = logLevel
  winston.addColors({
    silly: 'magenta',
    debug: 'blue',
    verbose: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  })
  winston.remove(winston.transports.Console)
  winston.add(winston.transports.Console, {
    level: process.env.LOG_LEVEL || logLevel,
    prettyPrint: true,
    colorize: 'all',
    silent: false,
    timestamp: true
  })

  // save log
  log = winston
  log.info('Logger\'s inited')
}

export default log
