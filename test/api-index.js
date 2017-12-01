import Code from 'code'
import Lab from 'lab'
import LabbableServer from '../lib'

const lab = exports.lab = Lab.script()
const describe = lab.describe
const before = lab.before
const it = lab.it
const expect = Code.expect

describe('modules/api/index', () => {
  let server

  before(() => {
    LabbableServer.ready((err, srv) => {
      if (err) {
        throw err
      }
      server = srv
    })
  })

  describe('health end point', () => {
    it('should return http status 200', () => {
      server.inject('/api/health', (res) => {
        expect(res.statusCode).to.be.equal(200)
        let jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.status).to.equal('UP')
      })
    })
  })

  describe('version end point', () => {
    it('should return http status 200', () => {
      server.inject('/api/version', (res) => {
        expect(res.statusCode).to.be.equal(200)
        let jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.version).to.equal('1.0.0')
      })
    })
  })
})
