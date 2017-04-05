// @flow
import { mergeAll, map, prop, compose } from 'ramda'
import { promiseMiddleware } from '../lib/middleware'
import authMiddleware from '../middlewares/authenticate'
import dbMiddleware from '../middlewares/database'

// load all resolver modules
const resolvers = [
  require('./user')
]

// apply all middlewares to queries
const appliedMiddlewares = map(promiseMiddleware(dbMiddleware, authMiddleware))

// read all the queries
const rootResolvers = {
  RootQuery: compose(mergeAll, map(appliedMiddlewares), map(prop('queries')))(resolvers)
}

// and mutations
const rootMutationResolvers = {
  Mutation: compose(mergeAll, map(appliedMiddlewares), map(prop('mutations')))(resolvers)
}

// then others
const schemaResolvers = compose(mergeAll, map(prop('resolvers')))(resolvers)

// Merge all of the resolver objects together
module.exports = mergeAll([rootResolvers, rootMutationResolvers, schemaResolvers])
