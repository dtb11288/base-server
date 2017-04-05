// @flow
// import config from '../config/config.json'
// import log from '../lib/log'
// import aws from 'aws-sdk'
// const env = process.env.NODE_ENV || 'development'
// let dynamodb
// aws.config.update(config[env].database)

export default (object: Object, args: Object, context: Object, info: Object) => {
  // if (!dynamodb) {
  //   log.info('Database\'s inited')
  //   dynamodb = new aws.DynamoDB()
  // }
  // context.dynamodb = dynamodb
  return Promise.resolve()
}
