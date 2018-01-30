const Code = require('code')
const Lab = require('lab')
const Sinon = require('sinon')
const Mongoose = require('mongoose')
const LabbableServer = require('../../../../lib')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const beforeEach = lab.beforeEach
const before = lab.before
const it = lab.it
const expect = Code.expect

describe('states endpoint', () => {
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

  beforeEach((done) => {
    Object.defineProperty(server, 'methods', {
      value: server.methods,
      configurable: true
    })
    Object.defineProperty(server.methods, 'services', {
      value: server.methods.services,
      configurable: true
    })
    Object.defineProperty(server.methods.services, 'states', {
      value: server.methods.services.states,
      configurable: true
    })
    Object.defineProperty(server.methods.services.states, 'list', {
      value: server.methods.services.states.list,
      configurable: true
    })
    return done()
  })

  it('should initializes', (done) => {
    expect(server).to.exist()
    expect(LabbableServer.isInitialized()).to.equal(true)
    done()
  })

  describe('GET /api/states', () => {
    it('should return list of states', (done) => {
      const State = Mongoose.model('State')
      const mockStates = [
        new State({
          name: 'Andhra Pradesh',
          districts: [
            'East Godavari Dist',
            'West Godavari Dist'
          ]
        }),
        new State({
          name: 'Telangana',
          districts: [
            'Hyderabad Dist',
            'Rangareddy Dist'
          ]
        })
      ]

      const ListMock = Sinon.mock(server.methods.services.states)
      ListMock.expects('list').yields(null, mockStates)
      server.inject('/api/states').then((res) => {
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.states).to.be.not.null()
        expect(JSON.parse(res.payload).states).length(2)
        done()
      }).catch(done)
    })

    it('should fail to return list of states', (done) => {
      const mockError = new Error('Failed to connect to mongodb')
      const ListMock = Sinon.mock(server.methods.services.states)
      ListMock.expects('list').yields(mockError, null)
      server.inject('/api/states').then((res) => {
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(422)
        expect(JSON.parse(res.payload).errors.Error[0]).to.equal('Failed to connect to mongodb')
        done()
      }).catch(done)
    })
  })
})
