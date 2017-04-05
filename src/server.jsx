// @flow
import fs from 'fs'
import http from 'http'
import https from 'https'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import Index from './ui/index.jsx'
import routes from './ui/routes.jsx'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import config from './config/config.json'
import { execute } from 'graphql'
import { ApolloClient, ApolloProvider, getDataFromTree } from 'react-apollo'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress } from 'graphql-server-express'
import schemas from './schemas'
import resolvers from './resolvers'
import log from './lib/log'
const env = process.env.NODE_ENV || 'development'

// init express app
const app = express()

// port
const port = config[env].port

// public data
app.use('/public', express.static('./build/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 'extended': false }))

// parse application/json
app.use(bodyParser.json())

// log request
app.use(morgan('tiny'))

// combine all schemas
const executableSchema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: resolvers,
  allowUndefinedInResolve: false,
  printErrors: true
})

// graphql
app.use('/graphql', graphqlExpress({ schema: executableSchema }))

// render router
app.use((request, response) => {
  match({
    routes,
    location: request.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      return response.status(500).send(error.message)
    }

    if (redirectLocation) {
      return response.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }

    if (!renderProps) {
      return response.status(404).send('Not found')
    }

    // create local network interface
    const createLocalInterface = (execute, schema, { rootValue = null, context = null } = {}) => ({
      query: ({ query, variables, operationName, debugName }) => execute(schema, query, rootValue, context, variables, operationName)
    })

    // prepare apollo client
    const client = new ApolloClient({
      ssrMode: true,
      networkInterface: createLocalInterface(execute, executableSchema)
    })

    // main content
    const Root = (
      <ApolloProvider client={client}>
        <RouterContext { ...renderProps } />
      </ApolloProvider>
    )

    // get data
    return getDataFromTree(Root).then(() => {
      // render html
      const initialState = { apollo: client.getInitialState() }
      const content = renderToString(Root)
      const html = renderToStaticMarkup(<Index content={content} state={initialState} />)
      return response.status(200).send(`<!DOCTYPE html>\n${html}`)
    }).catch(error => {
      return response.status(500).send(error.message)
    })
  })
})

// use https instead
if (config[env].ssl.enable) {
  const options = {
    key: fs.readFileSync(config[env].ssl.key),
    cert: fs.readFileSync(config[env].ssl.cert),
    requestCert: true,
    rejectUnauthorized: false
  }
  https.createServer(options, app).listen(port, () => log.info(`Server started with port: ${port}`))
} else {
  http.createServer(app).listen(port, () => log.info(`Server started with port: ${port}`))
}
