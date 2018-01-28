const JSONServer = require('json-server')
const path = require('path')
const Config = require('../../config/index')

module.exports = () => {
  const jServer = JSONServer.create()
  const router = JSONServer.router(path.join(__dirname, 'membership-db.json'))
  jServer.get('/', (req, res) => {
    res.send('JSON Server is running for mock membership data!')
  })
  jServer.use(router)
  jServer.listen(9999, () => {
    console.log('JSON Server running @ http://localhost:9999 for mock membership data')
  })
  Config.mockJSONServer = jServer
}
