const Package = require('../../package.json')

const conf = {}

conf.env = process.env.NODE_ENV || 'development'
console.log('@@@@ ENVIRONMENT:', conf.env, ' @@@@@')

if (conf.env !== 'production') {
  const JSONServer = require('json-server')
  const path = require('path')
  const jServer = JSONServer.create()
  const router = JSONServer.router(path.join(__dirname, '../resources/mock/membership-db.json'))
  jServer.get('/', (req, res) => {
    res.send('JSON Server is running for mock membership data!')
  })
  jServer.use(router)
  jServer.listen(9999, () => {
    console.log('JSON Server running @ http://localhost:9999 for mock membership data')
  })
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
      name: 'user',
      description: 'Member integration'
    }
  ]

}

module.exports = conf
