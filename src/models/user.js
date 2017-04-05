const aws = require('aws-sdk')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')

aws.config.update(config[env].database)

// const dynamodb = new aws.DynamoDB()

// const params = {
//   TableName: 'User',
//   KeySchema: [
//     { AttributeName: 'username', KeyType: 'HASH' },
//     { AttributeName: 'role', KeyType: 'SORT' }
//   ],
//   AttributeDefinitions: [
//     { AttributeName: 'username', AttributeType: 'S' },
//     { AttributeName: 'role', AttributeType: 'S' }
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 10,
//     WriteCapacityUnits: 10
//   }
// }

// dynamodb.createTable(params, console.log)

const docClient = new aws.DynamoDB.DocumentClient()

const admin = {
  TableName: 'User',
  Item: {
    username: 'admin',
    password: 'p@ssword',
    email: 'admin@3c7v.com',
    role: 'admin'
  }
}

docClient.put(admin, console.log)
