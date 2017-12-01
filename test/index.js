import Code from 'code'
import Lab from 'lab'
import LabbableServer from '../lib'

const lab = exports.lab = Lab.script()
const describe = lab.describe
const before = lab.before
const it = lab.it
const expect = Code.expect

describe('index', () => {
  let server

  before(() => {
    LabbableServer.ready((err, srv) => {
      if (err) {
        throw err
      }
      server = srv
    })
  })

  it('should initialize server', () => {
    expect(server).to.exist()
    expect(LabbableServer.isInitialized()).to.equal(true)
  })
})
