// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { gql, graphql } from 'react-apollo'

const mapQueriesToProps = gql`
  query {
    users {
      id
      firstName
      lastName
    }
  }
`

const Main = ({ data }) => (!data.users
  ? <Link to='/view'>View</Link>
  : <div className='main'>
    <Helmet title='Main' />
    <Link to='/view'>View</Link>
    <h1>{data.users[0].firstName} {data.users[0].lastName}</h1>
  </div>
)

export default graphql(mapQueriesToProps)(Main)
