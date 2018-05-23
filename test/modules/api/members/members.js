const Code = require('code')
const Lab = require('lab')
const Sinon = require('sinon')
const LabbableServer = require('../../../../lib')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const beforeEach = lab.beforeEach
const before = lab.before
const it = lab.it
const expect = Code.expect

describe('members endpoint', () => {
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
    Object.defineProperty(server.methods.services, 'members', {
      value: server.methods.services.members,
      configurable: true
    })
    Object.defineProperty(server.methods.services.members, 'findMember', {
      value: server.methods.services.members.findMember,
      configurable: true
    })
    done()
  })

  it('should initializes', (done) => {
    expect(server).to.exist()
    expect(LabbableServer.isInitialized()).to.equal(true)
    done()
  })

  describe('GET /api/members', () => {
    const mockMembers = [
      {
        id: 1,
        first: 'TestFirst',
        last: 'TestLast',
        email: 'first.last@gmail.com',
        mobile: '7701230000',
        membership: 'Life'
      }
    ]

    it('should return a member by phone number', (done) => {
      const MembersMock = Sinon.mock(server.methods.services.members)
      MembersMock.expects('findMember').withArgs({ phone: '7701230000' }).yields(null, mockMembers)
      server.inject({
        method: 'GET',
        url: '/api/member?phone=7701230000'
      }).then((res) => {
        MembersMock.verify()
        MembersMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload).to.be.not.null()
        expect(res.payload.members).to.be.not.null()
        const result = JSON.parse(res.payload)
        expect(result.members[0].id).to.equal(mockMembers[0].id)
        expect(result.members[0].first).to.equal(mockMembers[0].first)
        expect(result.members[0].last).to.equal(mockMembers[0].last)
        expect(result.members[0].email).to.equal(mockMembers[0].email)
        expect(result.members[0].mobile).to.equal(mockMembers[0].mobile)
        expect(result.members[0].membership).to.equal(mockMembers[0].membership)
        done()
      }).catch(done)
    })

    it('should fail to return a member by phone number', (done) => {
      const expectedError = {
        errors: {
          404: ['Failed to find member']
        }
      }
      const MembersMock = Sinon.mock(server.methods.services.members)
      MembersMock.expects('findMember').withArgs({ phone: '7701230000' }).yields(null, null)
      server.inject({
        method: 'GET',
        url: '/api/member?phone=7701230000'
      }).then((res) => {
        MembersMock.verify()
        MembersMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to return a member by phone number with an error', (done) => {
      const mockError = new Error('Failed to connect to word press API')
      const expectedError = {
        'errors': {
          'Error': [
            'Failed to connect to word press API'
          ]
        }
      }
      const MembersMock = Sinon.mock(server.methods.services.members)
      MembersMock.expects('findMember').withArgs({ phone: '7701230000' }).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: '/api/member?phone=7701230000'
      }).then((res) => {
        MembersMock.verify()
        MembersMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })
})
