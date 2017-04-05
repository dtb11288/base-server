// @flow
import jwt from 'jsonwebtoken'
import log from '../lib/log'
import config from '../config/config.json'
const env = process.env.NODE_ENV || 'development'
const authConfig = config[env].auth

let tokens = {}

export const mutations = {
  addUser: (root: Object, args: Object, context: Object, info: Object) => Promise.resolve({id: 1, firstName: 'abc', lastName: 'def'})
}

export const queries = {
  users: (root: Object, args: Object, context: Object, info: Object) => Promise.resolve([{id: 1, firstName: 'abc', lastName: 'def'}]),

  [authConfig.tokenQuery]: (root, args, context, info) => {
    // verify user, password

    // create token
    try {
      if (!authConfig.secretKey) return Promise.reject('Can not create token key')
      const token = jwt.sign(args, authConfig.secretKey)
      // save token to cache or else
      tokens[`token_${token}`] = args
      return Promise.resolve(token)
    } catch (error) {
      return Promise.reject('Can not create token key')
    }
  }
}

export const resolvers = {
  User: {
    posts: (user: Array<any>) => []
  }
}
