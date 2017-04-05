// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { gql, graphql } from 'react-apollo'

const mapQueriesToProps = gql`
  query {
    signIn(username: "abc", password: "def")
  }
`

const Login = () => (
  <h1>Login</h1>
)

export default graphql(mapQueriesToProps)(Login)
