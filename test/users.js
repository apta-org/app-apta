import Code from 'code'
import Lab from 'lab'
import LabbableServer from '../lib'

const lab = exports.lab = Lab.script()
const describe = lab.describe
const before = lab.before
const it = lab.it
const expect = Code.expect

describe('modules/api/users/users', () => {
  let server

  before(() => {
    LabbableServer.ready((err, srv) => {
      if (err) {
        throw err
      }
      server = srv
    })
  })

  describe('users end point', () => {
    it('should return http status 200', () => {
      server.inject('/api/user', (res) => {
        expect(res.statusCode).to.be.equal(200)
        let jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.message).to.equal('Hello world')
      })
    })
  })
})
