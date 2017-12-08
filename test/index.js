const Code = require('code')
const Lab = require('lab')
const LabbableServer = require('../lib')

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
})
