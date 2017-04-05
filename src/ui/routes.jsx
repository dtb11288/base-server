// @flow
import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'
import Main from './containers/main.jsx'
import View from './containers/view.jsx'
import Login from './containers/login.jsx'
import { Layout, LoginLayout } from './layout.jsx'

export default (
  <Route>
    <Route path='/' component={Layout}>
      <IndexRoute component={Main} />
      <Route path='view' component={View} />
    </Route>
    <Route component={LoginLayout}>
      <Route path='/login' component={Login} />
    </Route>
  </Route>
)

