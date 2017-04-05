// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

const View = () => (
  <div>
    <Helmet title='View' />
    <Link to='/'>Main</Link>
  </div>
)

export default View
