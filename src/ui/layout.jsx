// @flow
import React from 'react'
import Helmet from 'react-helmet'
import App from './app.jsx'
import Navbar from './components/navbar.jsx'

export const Layout = ({children}) => (
  <App>
    <Navbar />
    {children}
  </App>
)

export const LoginLayout = ({children}) => (
  <App>
    {children}
  </App>
)
