// @flow
import React from 'react'
import { render } from 'react-dom'
import { defaultTo, identity } from 'ramda'
import { Router, browserHistory } from 'react-router'
import routes from './ui/routes.jsx'
import ApolloClient from 'apollo-client'
import { createNetworkInterface, ApolloProvider } from 'react-apollo'
import { compose, combineReducers, createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const initialState = window.__INITIAL_STATE__
let store

// create network interface
const networkInterface = createNetworkInterface({
  uri: '/graphql'
})

// add token for apollo request
const tokenMiddleware = {
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      // Create the header object if needed.
      req.options.headers = {}
    }
    const token = defaultTo('getTokenKey', store.getState().authToken)
    req.options.headers['Authorization'] = `Bearer ${token}`
    next()
  }
}

// create apollo client
networkInterface.use([tokenMiddleware])
const client = new ApolloClient({
  networkInterface
})

// all reducers
const reducers = combineReducers({
  routing: routerReducer,
  apollo: client.reducer()
})

// redux middlewares
const createStoreWithMiddleware = compose(
  applyMiddleware(client.middleware()),
  (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : identity
)(createStore)

// create store
store = createStoreWithMiddleware(reducers, initialState)

// history sync with store
const history = syncHistoryWithStore(browserHistory, store)

// provider
const Root = () => (
  <ApolloProvider store={store} client={client}>
    <Router history={history} routes={routes} />
  </ApolloProvider>
)

render(<Root />, document.getElementById('root'))
