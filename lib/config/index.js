const Package = require('../../package.json')
const MockJSONServer = require('../resources/mock/mock-membership-server')

const conf = {}

conf.env = process.env.NODE_ENV || 'development'
console.log('@@@@ ENVIRONMENT:', conf.env, ' @@@@@')

if (conf.env !== 'production' && conf.env !== 'test') {
  MockJSONServer()
}

conf.database = {
  uri: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/asepdb',
  options: {
    keepAlive: 300000,
    connectionTimeoutMS: 300000,
    useMongoClient: true
  }
}

conf.swagger = {
  info: {
    title: 'APTA API Documentation',
    version: Package.version
  },
  cors: true,
  documentationPath: '/',
  grouping: 'tags',
  sortEndpoints: 'path',
  jsonEditor: true,
  tags: [
    {
      name: 'member',
      description: 'Member Integration'
    },
    {
      name: 'courses',
      description: 'Manage Courses'
    },
    {
      name: 'rules',
      description: 'Manage Rules for each Course'
    },
    {
      name: 'health',
      description: 'Health of the API'
    },
    {
      name: 'version',
      description: 'Version of the API'
    }
  ]

}

module.exports = conf
