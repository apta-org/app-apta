const Code = require('code')
const Lab = require('lab')
const LabbableServer = require('../../../lib/index')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const before = lab.before
const it = lab.it
const expect = Code.expect

describe('health, version endpoints', () => {
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

  describe('GET /api/health', () => {
    it('should return http status 200', (done) => {
      server.inject('/api/health', (res) => {
        expect(res.statusCode).to.be.equal(200)
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.status).to.equal('UP')
        done()
      })
    })
  })

  describe('GET /api/version', () => {
    it('should return http status 200', (done) => {
      server.inject('/api/version', (res) => {
        expect(res.statusCode).to.be.equal(200)
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.version).to.equal('1.0.0')
        done()
      })
    })
  })
})
