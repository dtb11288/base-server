// @flow
import jwt from 'jsonwebtoken'
import { chainMaybe } from '../lib/utils'
import { pipe, path, replace } from 'ramda'
import Maybe from 'folktale/data/maybe'
import config from '../config/config.json'
import log from '../lib/log'
const env = process.env.NODE_ENV || 'development'
const authConfig = config[env].auth

export default (object: Object, args: Object, context: Object, info: Object) => {
  return Promise.resolve()
  const token = pipe(
    chainMaybe(path(['headers', 'authorization'])),
    chainMaybe(replace('Bearer ', ''))
  )(Maybe.fromNullable(context))

  if (token.isNothing) {
    return Promise.reject('Invalid token')
  } else if (info.fieldName === authConfig.tokenQuery && token.value === authConfig.publicKey) {
    return Promise.resolve()
  }

  try {
    const decoded = jwt.verify(token.value, authConfig.secretKey)
    log.debug(decoded)
    log.info('Authenticated!')
    return Promise.resolve()
  } catch (error) {
    return Promise.reject('Invalid token')
  }
}
