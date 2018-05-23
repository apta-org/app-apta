const Code = require('code')
const Sinon = require('sinon')
const Lab = require('lab')
const Mongoose = require('mongoose')
const Service = require('../../../lib/modules/services/student-referrals')
require('sinon-mongoose')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const beforeEach = lab.beforeEach
const it = lab.it
const expect = Code.expect

const mockReferral = {
  _id: '5a8a06c7ee0d26487b94c834',
  memberFirstName: 'RAVI',
  memberLastName: 'KALLI',
  memberEmail: 'ravi.kalli@gmail.com',
  memberPhone: '9723756287',
  asepYear: '2018',
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

const assertStudent = (result) => {
  const mockStudent = mockReferral.students[0]
  expect(result.id).to.equal(mockStudent.id)
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
  expect(result.id).to.equal(mockReferral.id)
  expect(result.memberFirstName).to.equal(mockReferral.memberFirstName)
  expect(result.memberLastName).to.equal(mockReferral.memberLastName)
  expect(result.memberEmail).to.equal(mockReferral.memberEmail)
  expect(result.memberPhone).to.equal(mockReferral.memberPhone)
  expect(result.asepYear).to.equal(mockReferral.asepYear)
  assertStudent(result.students[0])
}

describe('Service [Student-Referrals]', () => {
  const Referral = Mongoose.model('StudentReferral')

  describe('fetch referral by id', () => {
    const referralId = '5a7273171a07f76126e8a791'
    let ReferralMock

    beforeEach((done) => {
      ReferralMock = Sinon.mock(Referral)
      return done()
    })

    it('should return a referral by id', (done) => {
      ReferralMock
        .expects('findOne')
        .withArgs({ _id: referralId })
        .chain('populate', 'students')
        .chain('exec')
        .resolves(mockReferral)

      Service[0].method(referralId, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertReferral(result)
        done()
      })
    })

    it('should fail to return referral by id with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      ReferralMock
        .expects('findOne')
        .withArgs({ _id: referralId })
        .chain('populate', 'students')
        .chain('exec')
        .resolves(mockError)

      Service[0].method(referralId, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch referral by student and ASEP year', () => {
    const mockStudentId = '5a8a0552a609d9479c355d1d'
    const mockYear = '2018'
    let ReferralMock

    beforeEach((done) => {
      ReferralMock = Sinon.mock(Referral)
      return done()
    })

    it('should return a referral by student and ASEP year', (done) => {
      ReferralMock
        .expects('findOne')
        .withArgs({ students: [mockStudentId], asepYear: mockYear })
        .chain('populate', 'students')
        .chain('exec')
        .resolves(mockReferral)

      Service[1].method(mockReferral.students[0], mockYear, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertReferral(result)
        done()
      })
    })

    it('should fail to return referral by student and ASEP year with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      ReferralMock
        .expects('findOne')
        .withArgs({ students: [mockStudentId], asepYear: mockYear })
        .chain('populate', 'students')
        .chain('exec')
        .resolves(mockError)

      Service[1].method(mockReferral.students[0], mockYear, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch referrals by ASEP year', () => {
    const mockYear = '2018'
    let ReferralMock

    beforeEach((done) => {
      ReferralMock = Sinon.mock(Referral)
      return done()
    })

    it('should return all referrals by ASEP year', (done) => {
      ReferralMock
        .expects('find')
        .withArgs({ asepYear: mockYear })
        .chain('sort', { memberFirstName: 1, memberLastName: 1 })
        .chain('populate', 'students')
        .chain('exec')
        .resolves([mockReferral])

      Service[2].method(mockYear, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertReferral(result[0])
        done()
      })
    })

    it('should fail to return all referrals by ASEP year with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      ReferralMock
        .expects('find')
        .withArgs({ asepYear: mockYear })
        .chain('sort', { memberFirstName: 1, memberLastName: 1 })
        .chain('populate', 'students')
        .chain('exec')
        .resolves(mockError)

      Service[2].method(mockYear, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch referrals by member email and ASEP year', () => {
    const mockYear = '2018'
    const mockEmail = 'ravi.kalli@gmail.com'
    let ReferralMock

    beforeEach((done) => {
      ReferralMock = Sinon.mock(Referral)
      return done()
    })

    it('should return all referrals by member email and ASEP year', (done) => {
      ReferralMock
        .expects('find')
        .withArgs({ memberEmail: mockEmail, asepYear: mockYear })
        .chain('sort', { memberFirstName: 1, memberLastName: 1 })
        .chain('populate', 'students')
        .chain('exec')
        .resolves([mockReferral])

      Service[3].method(mockEmail, mockYear, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertReferral(result[0])
        done()
      })
    })

    it('should fail to return all referrals by member email and ASEP year with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      ReferralMock
        .expects('find')
        .withArgs({ memberEmail: mockEmail, asepYear: mockYear })
        .chain('sort', { memberFirstName: 1, memberLastName: 1 })
        .chain('populate', 'students')
        .chain('exec')
        .resolves(mockError)

      Service[3].method(mockEmail, mockYear, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch referrals by member and ASEP year', () => {
    const mockYear = '2018'
    const mockFirstName = 'Ravi'
    const mockLastName = 'Kalli'
    let ReferralMock

    beforeEach((done) => {
      ReferralMock = Sinon.mock(Referral)
      return done()
    })

    it('should return all referrals by member and ASEP year', (done) => {
      const query = {
        memberFirstName: { $regex: new RegExp(`.*${mockFirstName}.*`, 'i') },
        memberLastName: { $regex: new RegExp(`.*${mockLastName}.*`, 'i') },
        asepYear: mockYear
      }

      ReferralMock
        .expects('find')
        .withArgs(query)
        .chain('sort', { memberFirstName: 1, memberLastName: 1 })
        .chain('populate', 'students')
        .chain('exec')
        .resolves([mockReferral])

      Service[4].method(mockFirstName, mockLastName, mockYear, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertReferral(result[0])
        done()
      })
    })

    it('should fail to return all referrals by member and ASEP year with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      const query = {
        memberFirstName: { $regex: new RegExp(`.*${mockFirstName}.*`, 'i') },
        memberLastName: { $regex: new RegExp(`.*${mockLastName}.*`, 'i') },
        asepYear: mockYear
      }

      ReferralMock
        .expects('find')
        .withArgs(query)
        .chain('sort', { memberFirstName: 1, memberLastName: 1 })
        .chain('populate', 'students')
        .chain('exec')
        .resolves(mockError)

      Service[4].method(mockFirstName, mockLastName, mockYear, (err, result) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('create student and referral', () => {
    const Student = Mongoose.model('Student')
    const payload = {
      firstName: 'YAMINI',
      lastName: 'GUNTUPALLI',
      email: 'yamini@gmail.com',
      memberFirstName: 'RAVI',
      memberLastName: 'KALLI',
      memberEmail: 'ravi.kalli@gmail.com',
      memberPhone: '9723756287',
      asepYear: '2018'
    }
    const mockStudent = {
      id: '5a7273171a07f76126e8a791',
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
      state: '',
      pinCode: ''
    }

    beforeEach((done) => {
      Object.defineProperty(Student.prototype, 'save', {
        value: Student.prototype.save,
        configurable: true
      })
      Object.defineProperty(Referral.prototype, 'save', {
        value: Referral.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should create student and referral and return newly created', (done) => {
      const StudentMock = Sinon.mock(Student.prototype)
      StudentMock.expects('save').yields(null, mockStudent)
      const ReferralMock = Sinon.mock(Referral.prototype)
      ReferralMock.expects('save').yields(null, mockReferral)

      Service[5].method(payload, (err, savedReferral) => {
        StudentMock.verify()
        StudentMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.null()
        expect(savedReferral).to.be.not.null()
        expect(savedReferral).not.to.be.null()
        assertReferral(savedReferral)
        done()
      })
    })

    it('should fail to create student while attempting to create a referral and return error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')
      const StudentMock = Sinon.mock(Student.prototype)
      StudentMock.expects('save').yields(mockError, null)

      Service[5].method(payload, (err, savedReferral) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(savedReferral).to.be.null()
        done()
      })
    })

    it('should create student and fail to create referral and then remove newly created student', (done) => {
      const mockError = new Error('Failed to connect to mongodb')
      const mockStudentObj = new Student(Object.assign(payload))
      const StudentMock = Sinon.mock(Student.prototype)
      StudentMock.expects('save').yields(null, mockStudentObj)
      const ReferralMock = Sinon.mock(Referral.prototype)
      ReferralMock.expects('save').yields(mockError, null)

      Service[5].method(payload, (err, savedReferral) => {
        StudentMock.verify()
        StudentMock.restore()
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.not.null()
        expect(savedReferral).to.be.null()
        done()
      })
    })
  })

  describe('create referral', () => {
    const payload = Object.assign({ mockReferral })
    delete payload._id

    beforeEach((done) => {
      Object.defineProperty(Referral.prototype, 'save', {
        value: Referral.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should create referral and return newly created', (done) => {
      const ReferralMock = Sinon.mock(Referral.prototype)
      ReferralMock.expects('save').yields(null, mockReferral)

      Service[6].method(payload, (err, savedReferral) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.null()
        expect(savedReferral).to.be.not.null()
        expect(savedReferral).not.to.be.null()
        assertReferral(savedReferral)
        done()
      })
    })

    it('should fail to create referral and return error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')
      const ReferralMock = Sinon.mock(Referral.prototype)
      ReferralMock.expects('save').yields(mockError, null)

      Service[6].method(payload, (err, savedReferral) => {
        ReferralMock.verify()
        ReferralMock.restore()
        expect(err).to.be.not.null()
        expect(savedReferral).to.be.null()
        done()
      })
    })
  })
})
