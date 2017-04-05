// @flow
const modules = [
  require('./user'),
  require('./post')
]

const { queries, mutations, schemas } = modules.reduce(({ queries, mutations, schemas }, module) => {
  queries += module.queries || ''
  mutations += module.mutations || ''
  schemas += module.schemas || ''
  return { queries, mutations, schemas }
}, { queries: '', mutations: '', schemas: '' })

const rootMutations =
`
type Mutation {${mutations}}
`

const rootQuery =
`
type RootQuery {${queries}}
`

const schemaDefinition =
`
schema {
  query: RootQuery
  mutation: Mutation
}
`

export default [schemaDefinition, rootQuery, rootMutations, schemas].join('')
