// @flow
import React from 'react'
import Helmet from 'react-helmet'

const App = ({children}) => (
  <div>
    <Helmet title='Loading...' titleTemplate='%s - DMS System' />
    {children}
  </div>
)

export default App
