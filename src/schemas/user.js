import config from '../config/config.json'
const env = process.env.NODE_ENV || 'development'

export const queries =
`
  ${config[env].auth.tokenQuery}(username: String, password: String): String
  users(id: String): [User]
`

export const mutations =
`
  addUser(user: UserInput): User
`

export const schemas =
`
type User {
  id: String
  firstName: String
  lastName: String
  posts: [Post]
}

input UserInput {
  firstName: String
  lastName: String
}
`

