const Code = require('code')
const Sinon = require('sinon')
const Lab = require('lab')
const Mongoose = require('mongoose')
const Service = require('../../../lib/modules/services/students')
require('sinon-mongoose')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const beforeEach = lab.beforeEach
const it = lab.it
const expect = Code.expect

const mockStudent = {
  id: '5a7273171a07f76126e8a791',
  firstName: 'YAMINI',
  lastName: 'GUNTUPALLI',
  email: 'yamini@gmail.com',
  dateOfBirth: '31/10/2001',
  placeOfBirth: 'GUNTUR',
  phonePrimary: '7701234567',
  phoneSecondary: '',
  addressLane1: 'HNO:2-3/5, SIVALAYAM STREET',
  addressLane2: 'KOVVUR MANDAL',
  city: 'GUNTUR',
  district: 'GUNTUR DIST',
  state: 'ANDHRA PRADESH',
  pinCode: '500001'
}

const assertStudent = (result) => {
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

describe('Service [Student]', () => {
  const Student = Mongoose.model('Student')

  describe('fetch student by id', () => {
    const studentId = '5a7273171a07f76126e8a791'
    let StudentMock

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return a student by id', (done) => {
      StudentMock
        .expects('findOne')
        .withArgs({ _id: studentId })
        .chain('exec')
        .resolves(mockStudent)

      Service[0].method(studentId, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result)
        done()
      })
    })

    it('should fail to return student by id with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('findOne')
        .withArgs({ _id: studentId })
        .chain('exec')
        .resolves(mockError)

      Service[0].method(studentId, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch student by email', () => {
    const studentEmail = 'yamini@gmail.com'
    let StudentMock

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return a student by email', (done) => {
      StudentMock
        .expects('findOne')
        .withArgs({ email: { $regex: new RegExp(studentEmail, 'i') } })
        .chain('exec')
        .resolves(mockStudent)

      Service[1].method(studentEmail, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result)
        done()
      })
    })

    it('should fail to return student by email with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('findOne')
        .withArgs({ email: { $regex: new RegExp(studentEmail, 'i') } })
        .chain('exec')
        .resolves(mockError)

      Service[1].method(studentEmail, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch student by full name', () => {
    const studentFirstName = 'Yamini'
    const studentLastName = 'Guntupalli'
    let StudentMock

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return a student by full name', (done) => {
      StudentMock
        .expects('findOne')
        .withArgs({ firstName: studentFirstName, lastName: studentLastName })
        .chain('exec')
        .resolves(mockStudent)

      Service[2].method(studentFirstName, studentLastName, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result)
        done()
      })
    })

    it('should fail to return student by full name with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('findOne')
        .withArgs({ firstName: studentFirstName, lastName: studentLastName })
        .chain('exec')
        .resolves(mockError)

      Service[2].method(studentFirstName, studentLastName, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch students matching by first name', () => {
    const studentFirstName = 'Yamini'
    let StudentMock
    let mockStudents = []
    mockStudents.push(mockStudent)

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return students matching by first name', (done) => {
      StudentMock
        .expects('find')
        .withArgs({ firstName: { $regex: new RegExp(`.*${studentFirstName}.*`, 'i') } })
        .chain('exec')
        .resolves(mockStudents)

      Service[3].method(studentFirstName, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result[0])
        done()
      })
    })

    it('should fail to return students matching by first name with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('find')
        .withArgs({ firstName: { $regex: new RegExp(`.*${studentFirstName}.*`, 'i') } })
        .chain('exec')
        .resolves(mockError)

      Service[3].method(studentFirstName, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch students matching by last name', () => {
    const studentLastName = 'Guntupalli'
    let StudentMock
    let mockStudents = []
    mockStudents.push(mockStudent)

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return students matching by last name', (done) => {
      StudentMock
        .expects('find')
        .withArgs({ lastName: { $regex: new RegExp(`.*${studentLastName}.*`, 'i') } })
        .chain('exec')
        .resolves(mockStudents)

      Service[4].method(studentLastName, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result[0])
        done()
      })
    })

    it('should fail to return students by matching last name with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('find')
        .withArgs({ lastName: { $regex: new RegExp(`.*${studentLastName}.*`, 'i') } })
        .chain('exec')
        .resolves(mockError)

      Service[4].method(studentLastName, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch students matching by phone number', () => {
    const studentPhoneNumber = '7701234567'
    let StudentMock
    let mockStudents = []
    mockStudents.push(mockStudent)

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return students matching by last name', (done) => {
      StudentMock
        .expects('find')
        .withArgs({ $or: [{ phonePrimary: studentPhoneNumber }, { phoneSecondary: studentPhoneNumber }] })
        .chain('exec')
        .resolves(mockStudents)

      Service[5].method(studentPhoneNumber, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result[0])
        done()
      })
    })

    it('should fail to return students matching by last name with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('find')
        .withArgs({ $or: [{ phonePrimary: studentPhoneNumber }, { phoneSecondary: studentPhoneNumber }] })
        .chain('exec')
        .resolves(mockError)

      Service[5].method(studentPhoneNumber, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch students belong to same city', () => {
    const studentCity = 'guntur'
    let StudentMock
    let mockStudents = []
    mockStudents.push(mockStudent)

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return students belong to same city', (done) => {
      StudentMock
        .expects('find')
        .withArgs({ city: { $regex: new RegExp(studentCity, 'i') } })
        .chain('exec')
        .resolves(mockStudents)

      Service[6].method({ city: studentCity }, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result[0])
        done()
      })
    })

    it('should fail to return students belong to same city with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('find')
        .withArgs({ city: { $regex: new RegExp(studentCity, 'i') } })
        .chain('exec')
        .resolves(mockError)

      Service[6].method({ city: studentCity }, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch students belong to same district', () => {
    const studentDistrict = 'guntur dist'
    let StudentMock
    let mockStudents = []
    mockStudents.push(mockStudent)

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return students belong to same district', (done) => {
      StudentMock
        .expects('find')
        .withArgs({ district: { $regex: new RegExp(studentDistrict, 'i') } })
        .chain('exec')
        .resolves(mockStudents)

      Service[6].method({ district: studentDistrict }, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result[0])
        done()
      })
    })

    it('should fail to return students belong to same district with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('find')
        .withArgs({ district: { $regex: new RegExp(studentDistrict, 'i') } })
        .chain('exec')
        .resolves(mockError)

      Service[6].method({ district: studentDistrict }, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch students belong to same state', () => {
    const studentState = 'Andhra Pradesh'
    let StudentMock
    let mockStudents = []
    mockStudents.push(mockStudent)

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return students belong to same state', (done) => {
      StudentMock
        .expects('find')
        .withArgs({ state: { $regex: new RegExp(studentState, 'i') } })
        .chain('exec')
        .resolves(mockStudents)

      Service[6].method({ state: studentState }, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result[0])
        done()
      })
    })

    it('should fail to return students belong to same state with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('find')
        .withArgs({ state: { $regex: new RegExp(studentState, 'i') } })
        .chain('exec')
        .resolves(mockError)

      Service[6].method({ state: studentState }, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch students belong to same pinCode', () => {
    const studentPinCode = '500001'
    let StudentMock
    let mockStudents = []
    mockStudents.push(mockStudent)

    beforeEach((done) => {
      StudentMock = Sinon.mock(Student)
      return done()
    })

    it('should return students belong to same state', (done) => {
      StudentMock
        .expects('find')
        .withArgs({ pinCode: studentPinCode })
        .chain('exec')
        .resolves(mockStudents)

      Service[6].method({ pinCode: studentPinCode }, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        assertStudent(result[0])
        done()
      })
    })

    it('should fail to return students belong to same pinCode with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      StudentMock
        .expects('find')
        .withArgs({ pinCode: studentPinCode })
        .chain('exec')
        .resolves(mockError)

      Service[6].method({ pinCode: studentPinCode }, (err, result) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('create student', () => {
    const payload = Object.assign({ mockStudent })
    delete payload.id

    beforeEach((done) => {
      Object.defineProperty(Student.prototype, 'save', {
        value: Student.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should create student and return newly created', (done) => {
      const StudentMock = Sinon.mock(Student.prototype)
      StudentMock.expects('save').yields(null, mockStudent)

      Service[7].method(payload, (err, savedStudent) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(savedStudent).to.be.not.null()
        expect(savedStudent).not.to.be.null()
        assertStudent(savedStudent)
        done()
      })
    })

    it('should fail to create a student with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      const StudentMock = Sinon.mock(Student.prototype)
      StudentMock.expects('save').yields(mockError, null)

      Service[7].method(payload, (err, savedStudent) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(savedStudent).to.be.null()
        done()
      })
    })
  })

  describe('update student', () => {
    const payload = {}
    Object.assign(payload, mockStudent)
    delete payload.id
    payload.phoneSecondary = '7707771234'
    mockStudent._id = '5a7273171a07f76126e8a791'
    delete mockStudent.id

    beforeEach((done) => {
      Object.defineProperty(Student.prototype, 'save', {
        value: Student.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should update student and return updated', (done) => {
      const StudentMock = Sinon.mock(Student.prototype)
      StudentMock.expects('save').yields(null, payload)

      Service[8].method(mockStudent, payload, (err, updatedStudent) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.null()
        expect(updatedStudent).to.be.not.null()
        expect(updatedStudent).not.to.be.null()
        updatedStudent.id = '5a7273171a07f76126e8a791'
        mockStudent.id = '5a7273171a07f76126e8a791'
        mockStudent.phoneSecondary = '7707771234'
        assertStudent(updatedStudent)
        done()
      })
    })

    it('should fail to update student with an error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      const StudentMock = Sinon.mock(Student.prototype)
      StudentMock.expects('save').yields(mockError, null)

      Service[8].method(mockStudent, payload, (err, updatedStudent) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(err).to.be.not.null()
        expect(updatedStudent).to.be.null()
        done()
      })
    })
  })
})
