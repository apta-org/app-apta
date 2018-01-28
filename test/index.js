const Code = require('code')
const Lab = require('lab')
const LabbableServer = require('../lib')
const MockJSONServer = require('../lib/resources/mock/mock-membership-server')
const Axios = require('axios')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const before = lab.before
const it = lab.it
const expect = Code.expect

describe('index', () => {
  let server

  before((done) => {
    LabbableServer.ready((err, srv) => {
      if (err) {
        return done(err)
      }
      server = srv
      return done()
    })
  })

  it('should initialize server', (done) => {
    expect(server).to.exist()
    expect(LabbableServer.isInitialized()).to.equal(true)
    done()
  })

  it('should start mock json server for membership data in development mode', (done) => {
    MockJSONServer()
    Axios.get('http://localhost:9999')
      .then((res) => {
        expect(res.status).to.be.equal(200)
        expect(res).to.be.not.null()
        expect(res.data).to.equal('JSON Server is running for mock membership data!')
      })
      .catch((err) => {
        throw err
      })
    done()
  })
})
