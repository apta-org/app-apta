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

const Referral = Mongoose.model('StudentReferral')
const Student = Mongoose.model('Student')

const mockReferral = {
  _id: '5a8a06c7ee0d26487b94c834',
  memberFirstName: 'RAVI',
  memberLastName: 'KALLI',
  memberEmail: 'ravi.kalli@gmail.com',
  memberPhone: '9723756287',
  asepYear: '2018',
  secret: 'secret',
  salt: 'salt',
  students: [
    {
      _id: '5a8a0552a609d9479c355d1d',
      firstName: 'YAMINI',
      lastName: 'GUNTUPALLI',
      email: 'yamini@gmail.com',
      dateOfBirth: '',
      placeOfBirth: '',
      phonePrimary: '',
      phoneSecondary: '',
      addressLane1: '',
      addressLane2: '',
      city: '',
      district: '',
      state: 'ANDHRA PRADESH',
      pinCode: ''
    }
  ]
}

const mockReferralObj = new Referral(Object.assign(mockReferral))
mockReferralObj.students = [new Student(Object.assign(mockReferral.students[0]))]

const assertStudent = (result) => {
  const mockStudent = mockReferral.students[0]
  expect(result.id).to.equal(mockStudent._id)
  expect(result.firstName).to.equal(mockStudent.firstName)
  expect(result.lastName).to.equal(mockStudent.lastName)
  expect(result.email).to.equal(mockStudent.email)
  expect(result.dateOfBirth).to.equal(mockStudent.dateOfBirth)
  expect(result.placeOfBirth).to.equal(mockStudent.placeOfBirth)
  expect(result.phonePrimary).to.equal(mockStudent.phonePrimary)
  expect(result.phoneSecondary).to.equal(mockStudent.phoneSecondary)
  expect(result.addressLane1).to.equal(mockStudent.addressLane1)
  expect(result.addressLane2).to.equal(mockStudent.addressLane2)
  expect(result.city).to.equal(mockStudent.city)
  expect(result.district).to.equal(mockStudent.district)
  expect(result.state).to.equal(mockStudent.state)
  expect(result.pinCode).to.equal(mockStudent.pinCode)
}

const assertReferral = (result) => {
  expect(result.id).to.equal(mockReferral._id)
  expect(result.memberFirstName).to.equal(mockReferral.memberFirstName)
  expect(result.memberLastName).to.equal(mockReferral.memberLastName)
  expect(result.memberEmail).to.equal(mockReferral.memberEmail)
  expect(result.memberPhone).to.equal(mockReferral.memberPhone)
  expect(result.asepYear).to.equal(mockReferral.asepYear)
  assertStudent(result.students[0])
}

describe('student-referral end point', () => {
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
    Object.defineProperty(server.methods.services, 'studentreferrals', {
      value: server.methods.services.studentreferrals,
      configurable: true
    })
    Object.defineProperty(server.methods.services.studentreferrals, 'findReferralById', {
      value: server.methods.services.studentreferrals.findReferralById,
      configurable: true
    })
    Object.defineProperty(server.methods.services.studentreferrals, 'findReferralByStudentEmailAndYear', {
      value: server.methods.services.studentreferrals.findReferralByStudentEmailAndYear,
      configurable: true
    })
    Object.defineProperty(server.methods.services.studentreferrals, 'findReferralsByYear', {
      value: server.methods.services.studentreferrals.findReferralsByYear,
      configurable: true
    })
    Object.defineProperty(server.methods.services.studentreferrals, 'findReferralsByMemberEmailAndYear', {
      value: server.methods.services.studentreferrals.findReferralsByMemberEmailAndYear,
      configurable: true
    })
    Object.defineProperty(server.methods.services.studentreferrals, 'findReferralsByMemberAndYear', {
      value: server.methods.services.studentreferrals.findReferralsByMemberAndYear,
      configurable: true
    })
    Object.defineProperty(server.methods.services.studentreferrals, 'createStudentReferral', {
      value: server.methods.services.studentreferrals.createStudentReferral,
      configurable: true
    })
    Object.defineProperty(server.methods.services.studentreferrals, 'createReferral', {
      value: server.methods.services.studentreferrals.createReferral,
      configurable: true
    })
    return done()
  })

  it('should initializes', (done) => {
    expect(server).to.exist()
    expect(LabbableServer.isInitialized()).to.equal(true)
    done()
  })

  describe('GET /api/referrals/{id}', () => {
    let referralId = '5a8a06c7ee0d26487b94c834'

    it('should return a referral by id', (done) => {
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralById').withArgs(referralId).yields(null, mockReferralObj)
      server.inject({
        method: 'GET',
        url: `/api/referrals/${referralId}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.referral).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertReferral(jsonResponse.referral)
        done()
      }).catch(done)
    })

    it('should fail to return referral by id', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralById').withArgs(referralId).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/${referralId}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return referral by id not found error', (done) => {
      const expectedError = {
        errors: {
          404: [`Referral not found with id '${referralId}'`]
        }
      }
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralById').withArgs(referralId).yields(null, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/${referralId}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return invalid referral id when id does not match with mongoose id', (done) => {
      referralId = 'junk_id'
      const expectedError = {
        errors: {
          400: [`Invalid referral id '${referralId}'`]
        }
      }

      server.inject({
        method: 'GET',
        url: `/api/referrals/${referralId}`
      }).then((res) => {
        expect(res.statusCode).to.equal(400)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('GET /api/referrals/by-student?email={email}&year={asepYear}', () => {
    let studentEmail = 'yamini@gmail.com'
    const year = '2018'

    beforeEach((done) => {
      Object.defineProperty(server, 'methods', {
        value: server.methods,
        configurable: true
      })
      Object.defineProperty(server.methods, 'services', {
        value: server.methods.services,
        configurable: true
      })
      Object.defineProperty(server.methods.services, 'students', {
        value: server.methods.services.students,
        configurable: true
      })
      Object.defineProperty(server.methods.services.students, 'findByEmail', {
        value: server.methods.services.students.findByEmail,
        configurable: true
      })
      return done()
    })

    it('should return referral by student email and ASEP year', (done) => {
      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(studentEmail).yields(null, mockReferral.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralByStudentEmailAndYear').withArgs(mockReferral.students[0], year).yields(null, mockReferralObj)
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-student?email=${studentEmail}&year=${year}`
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.referral).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertReferral(jsonResponse.referral)
        done()
      }).catch(done)
    })

    it('should fail to return referral by student email and ASEP year', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(studentEmail).yields(null, mockReferral.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralByStudentEmailAndYear').withArgs(mockReferral.students[0], year).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-student?email=${studentEmail}&year=${year}`
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return referral by student email and ASEP year not found error', (done) => {
      const expectedError = {
        errors: {
          404: [`Referral not found for student with email '${studentEmail}'`]
        }
      }
      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(studentEmail).yields(null, mockReferral.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralByStudentEmailAndYear').withArgs(mockReferral.students[0], year).yields(null, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-student?email=${studentEmail}&year=${year}`
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to find matching student by email and return unknown error', (done) => {
      const mockError = {
        name: '500',
        message: 'An internal server error occurred'
      }
      const expectedError = {
        errors: {
          500: ['An internal server error occurred']
        }
      }

      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(studentEmail).yields(mockError, null)

      server.inject({
        method: 'GET',
        url: `/api/referrals/by-student?email=${studentEmail}&year=${year}`
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to find matching student by email and return student not found error', (done) => {
      const expectedError = {
        errors: {
          404: ['Student not found']
        }
      }

      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(studentEmail).yields(null, null)

      server.inject({
        method: 'GET',
        url: `/api/referrals/by-student?email=${studentEmail}&year=${year}`
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to find matching student by empty email and return error', (done) => {
      studentEmail = ''
      const expectedError = {
        errors: {
          email: ['"email" is not allowed to be empty']
        }
      }

      server.inject({
        method: 'GET',
        url: `/api/referrals/by-student?email=${studentEmail}&year=${year}`
      }).then((res) => {
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('GET /api/referrals/by-year?year={asepYear}', () => {
    const year = '2018'

    it('should return list of referral by ASEP year', (done) => {
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByYear').withArgs(year).yields(null, [mockReferralObj])
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-year?year=${year}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.referrals).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertReferral(jsonResponse.referrals[0])
        done()
      }).catch(done)
    })

    it('should fail to return list of referrals by ASEP year', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByYear').withArgs(year).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-year?year=${year}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('GET /api/referrals/by-member-email?memberEmail={email}&year={asepYear}', () => {
    const memberEmail = 'ravi.kalli@gmail.com'
    const year = '2018'

    it('should return list of referrals by member email and ASEP year', (done) => {
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberEmailAndYear').withArgs(memberEmail, year).yields(null, [mockReferralObj])
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-member-email?memberEmail=${memberEmail}&year=${year}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.referrals).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertReferral(jsonResponse.referrals[0])
        done()
      }).catch(done)
    })

    it('should fail to return list of referrals by member email and ASEP year', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberEmailAndYear').withArgs(memberEmail, year).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-member-email?memberEmail=${memberEmail}&year=${year}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('GET /api/referrals/by-member?memberFirstName={firstName}&memberLastName={lastName}&year={asepYear}', () => {
    const memberFirstName = 'ravi'
    const memberLastName = 'kalli'
    const year = '2018'

    it('should return list of referrals by member name and ASEP year', (done) => {
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberAndYear').withArgs(memberFirstName, memberLastName, year).yields(null, [mockReferralObj])
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-member?memberFirstName=${memberFirstName}&memberLastName=${memberLastName}&year=${year}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.referrals).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertReferral(jsonResponse.referrals[0])
        done()
      }).catch(done)
    })

    it('should fail to return list of referrals by member name and ASEP year', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }

      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberAndYear').withArgs(memberFirstName, memberLastName, year).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/by-member?memberFirstName=${memberFirstName}&memberLastName=${memberLastName}&year=${year}`
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('POST /api/referrals', () => {
    const payload = {
      memberFirstName: 'RAVI',
      memberLastName: 'KALLI',
      memberEmail: 'ravi.kalli@gmail.com',
      memberPhone: '9723756287',
      studentFirstName: 'YAMINI',
      studentLastName: 'GUNTUPALLI',
      studentEmail: 'yamini@gmail.com',
      asepYear: '2018'
    }

    beforeEach((done) => {
      Object.defineProperty(server, 'methods', {
        value: server.methods,
        configurable: true
      })
      Object.defineProperty(server.methods, 'services', {
        value: server.methods.services,
        configurable: true
      })
      Object.defineProperty(server.methods.services, 'students', {
        value: server.methods.services.students,
        configurable: true
      })
      Object.defineProperty(server.methods.services.students, 'findByEmail', {
        value: server.methods.services.students.findByEmail,
        configurable: true
      })
      return done()
    })

    it('should create student and referral when student does not exist and return newly created', (done) => {
      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(payload.studentEmail).yields(null, null)
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberEmailAndYear').withArgs(payload.memberEmail, payload.asepYear).yields(null, null)
      mockReferralObj.setHash(mockReferralObj)
      ReferralMock.expects('createStudentReferral').withArgs(payload).yields(null, mockReferralObj)
      server.inject({
        method: 'POST',
        payload: { referral: payload },
        url: '/api/referrals'
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(201)
        expect(res.payload.referral).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.referral.memberEmail).to.equal(mockReferral.memberEmail)
        expect(jsonResponse.referral.studentEmail).to.equal(mockReferral.students[0].email)
        expect(jsonResponse.referral.hash).to.be.not.null()
        done()
      }).catch(done)
    })

    it('should fail to create student and referral when student does not exist and return error', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }

      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(payload.studentEmail).yields(null, null)
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberEmailAndYear').withArgs(payload.memberEmail, payload.asepYear).yields(null, null)
      ReferralMock.expects('createStudentReferral').withArgs(payload).yields(mockError, null)
      server.inject({
        method: 'POST',
        payload: { referral: payload },
        url: '/api/referrals'
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to create student and referral when referral lookup fails and return error', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }

      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberEmailAndYear').withArgs(payload.memberEmail, payload.asepYear).yields(mockError, null)
      server.inject({
        method: 'POST',
        payload: { referral: payload },
        url: '/api/referrals'
      }).then((res) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should create referral when student exists and return newly created', (done) => {
      const referralPayload = {
        memberFirstName: 'RAVI',
        memberLastName: 'KALLI',
        memberEmail: 'ravi.kalli@gmail.com',
        memberPhone: '9723756287',
        asepYear: '2018',
        students: [mockReferralObj.students[0]._id]
      }

      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(payload.studentEmail).yields(null, mockReferralObj.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberEmailAndYear').withArgs(payload.memberEmail, payload.asepYear).yields(null, null)
      mockReferralObj.setHash(mockReferralObj)
      ReferralMock.expects('createReferral').withArgs(referralPayload).yields(null, mockReferralObj)
      server.inject({
        method: 'POST',
        payload: { referral: payload },
        url: '/api/referrals'
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(201)
        expect(res.payload.referral).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.referral.memberEmail).to.equal(mockReferral.memberEmail)
        expect(jsonResponse.referral.studentEmail).to.equal(mockReferral.students[0].email)
        expect(jsonResponse.referral.hash).to.be.not.null()
        done()
      }).catch(done)
    })

    it('should fail to create referral when student exists and return error', (done) => {
      const referralPayload = {
        memberFirstName: 'RAVI',
        memberLastName: 'KALLI',
        memberEmail: 'ravi.kalli@gmail.com',
        memberPhone: '9723756287',
        asepYear: '2018',
        students: [mockReferralObj.students[0]._id]
      }

      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }

      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(payload.studentEmail).yields(null, mockReferralObj.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberEmailAndYear').withArgs(payload.memberEmail, payload.asepYear).yields(null, null)
      mockReferralObj.setHash(mockReferralObj)
      ReferralMock.expects('createReferral').withArgs(referralPayload).yields(mockError, null)
      server.inject({
        method: 'POST',
        payload: { referral: payload },
        url: '/api/referrals'
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should just return hash when both student and referral exists', (done) => {
      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(payload.studentEmail).yields(null, mockReferralObj.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralsByMemberEmailAndYear').withArgs(payload.memberEmail, payload.asepYear).yields(null, [mockReferralObj])
      mockReferralObj.setHash(mockReferralObj)
      server.inject({
        method: 'POST',
        payload: { referral: payload },
        url: '/api/referrals'
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(200)
        expect(res.payload.referral).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.referral.memberEmail).to.equal(mockReferral.memberEmail)
        expect(jsonResponse.referral.studentEmail).to.equal(mockReferral.students[0].email)
        expect(jsonResponse.referral.hash).to.be.not.null()
        done()
      }).catch(done)
    })
  })

  describe('GET /api/referrals/verify/{hash}', () => {
    const studentEmail = 'yamini@gmail.com'
    const year = '2018'
    const mockHash = 'a01387d6700297410683e33b'

    beforeEach((done) => {
      Object.defineProperty(server, 'methods', {
        value: server.methods,
        configurable: true
      })
      Object.defineProperty(server.methods, 'services', {
        value: server.methods.services,
        configurable: true
      })
      Object.defineProperty(server.methods.services, 'students', {
        value: server.methods.services.students,
        configurable: true
      })
      Object.defineProperty(server.methods.services.students, 'findByEmail', {
        value: server.methods.services.students.findByEmail,
        configurable: true
      })
      return done()
    })

    it('should successfully validate given hash by student email and ASEP year', (done) => {
      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(studentEmail).yields(null, mockReferral.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralByStudentEmailAndYear').withArgs(mockReferral.students[0], year).yields(null, mockReferralObj)
      server.inject({
        method: 'GET',
        url: `/api/referrals/verify/${mockHash}?email=${studentEmail}&year=${year}`
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.valid).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.valid).to.be.equal(false)
        done()
      }).catch(done)
    })

    it('should fail to validate given hash as referral lookup failed due to an error', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(studentEmail).yields(null, mockReferral.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralByStudentEmailAndYear').withArgs(mockReferral.students[0], year).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/verify/${mockHash}?email=${studentEmail}&year=${year}`
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to validate given hash as referral is not found', (done) => {
      const expectedError = {
        errors: {
          404: [`Referral not found for student with email '${studentEmail}'`]
        }
      }
      const FindByStudentEmailMock = Sinon.mock(server.methods.services.students)
      FindByStudentEmailMock.expects('findByEmail').withArgs(studentEmail).yields(null, mockReferral.students[0])
      const ReferralMock = Sinon.mock(server.methods.services.studentreferrals)
      ReferralMock.expects('findReferralByStudentEmailAndYear').withArgs(mockReferral.students[0], year).yields(null, null)
      server.inject({
        method: 'GET',
        url: `/api/referrals/verify/${mockHash}?email=${studentEmail}&year=${year}`
      }).then((res) => {
        FindByStudentEmailMock.verify()
        FindByStudentEmailMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })
})
