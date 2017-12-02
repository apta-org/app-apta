import Package from '../../package.json'

const conf = {}

conf.env = process.env.NODE_ENV || 'development'
console.log('@@@@ ENVIRONMENT:', conf.env, ' @@@@@')

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
      name: 'user',
      description: 'Member integration'
    }
  ]

}

module.exports = conf
