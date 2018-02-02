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

const Student = Mongoose.model('Student')
const mockStudent = new Student({
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
})

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

describe('students endpoint', () => {
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
    Object.defineProperty(server.methods.services, 'students', {
      value: server.methods.services.students,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'findById', {
      value: server.methods.services.students.findById,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'findByEmail', {
      value: server.methods.services.students.findByEmail,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'findByName', {
      value: server.methods.services.students.findByName,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'findByFirstName', {
      value: server.methods.services.students.findByFirstName,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'findByLastName', {
      value: server.methods.services.students.findByLastName,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'findByPhone', {
      value: server.methods.services.students.findByPhone,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'findByLocation', {
      value: server.methods.services.students.findByLocation,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'create', {
      value: server.methods.services.students.create,
      configurable: true
    })
    Object.defineProperty(server.methods.services.students, 'update', {
      value: server.methods.services.students.update,
      configurable: true
    })
    return done()
  })

  it('should initializes', (done) => {
    expect(server).to.exist()
    expect(LabbableServer.isInitialized()).to.equal(true)
    done()
  })

  describe('GET /api/students/{id}', () => {
    let studentId = '5a7273171a07f76126e8a791'

    it('should return a student by id', (done) => {
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findById').withArgs(studentId).yields(null, mockStudent)
      server.inject({
        method: 'GET',
        url: `/api/students/${studentId}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.course).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertStudent(jsonResponse.student)
        done()
      }).catch(done)
    })

    it('should fail to return student by id', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findById').withArgs(studentId).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/students/${studentId}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return student by id not found error', (done) => {
      const expectedError = {
        errors: {
          404: [`Student not found with id '${studentId}'`]
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findById').withArgs(studentId).yields(null, null)
      server.inject({
        method: 'GET',
        url: `/api/students/${studentId}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return invalid student id when id does not match with mongoose id', (done) => {
      studentId = 'junk_id'
      const expectedError = {
        errors: {
          400: [`Invalid student id '${studentId}'`]
        }
      }

      server.inject({
        method: 'GET',
        url: `/api/students/${studentId}`
      }).then((res) => {
        expect(res.statusCode).to.equal(400)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('GET /api/students/by-email?email={email}', () => {
    const studentEmail = 'yamini@gmail.com'

    it('should return a student by email', (done) => {
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByEmail').withArgs(studentEmail).yields(null, mockStudent)
      server.inject({
        method: 'GET',
        url: `/api/students/by-email?email=${studentEmail}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.course).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertStudent(jsonResponse.student)
        done()
      }).catch(done)
    })

    it('should fail to return student by email', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByEmail').withArgs(studentEmail).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/students/by-email?email=${studentEmail}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return student by email not found error', (done) => {
      const expectedError = {
        errors: {
          404: [`Student not found with email '${studentEmail}'`]
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByEmail').withArgs(studentEmail).yields(null, null)
      server.inject({
        method: 'GET',
        url: `/api/students/by-email?email=${studentEmail}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('GET /api/students/by-name?firstName={firstName}&lastName={lastName}', () => {
    const studentFirstName = 'yamini'
    const studentLastName = 'guntupalli'

    it('should return a student by name', (done) => {
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByName').withArgs(studentFirstName, studentLastName).yields(null, mockStudent)
      server.inject({
        method: 'GET',
        url: `/api/students/by-name?firstName=${studentFirstName}&lastName=${studentLastName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.course).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertStudent(jsonResponse.student)
        done()
      }).catch(done)
    })

    it('should fail to return student by name', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByName').withArgs(studentFirstName, studentLastName).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/students/by-name?firstName=${studentFirstName}&lastName=${studentLastName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return student by name not found error', (done) => {
      const expectedError = {
        errors: {
          404: [`Student not found with name '${studentFirstName} ${studentLastName}'`]
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByName').withArgs(studentFirstName, studentLastName).yields(null, null)
      server.inject({
        method: 'GET',
        url: `/api/students/by-name?firstName=${studentFirstName}&lastName=${studentLastName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('GET /api/students/by-first-name?firstName={firstName}', () => {
    const studentFirstName = 'yamini'

    it('should return list of students matching by first name', (done) => {
      let mockStudents = []
      mockStudents.push(mockStudent)
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByFirstName').withArgs(studentFirstName).yields(null, mockStudents)
      server.inject({
        method: 'GET',
        url: `/api/students/by-first-name?firstName=${studentFirstName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.course).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertStudent(jsonResponse.students[0])
        done()
      }).catch(done)
    })

    it('should fail to return list of students matching by first name', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByFirstName').withArgs(studentFirstName).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/students/by-first-name?firstName=${studentFirstName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return students not found matching by first name error', (done) => {
      const expectedError = {
        errors: {
          404: [`Students not found with first name '${studentFirstName}'`]
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByFirstName').withArgs(studentFirstName).yields(null, null)
      server.inject({
        method: 'GET',
        url: `/api/students/by-first-name?firstName=${studentFirstName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('GET /api/students/by-last-name?lastName={lastName}', () => {
    const studentLastName = 'guntupalli'

    it('should return list of students matching by last name', (done) => {
      let mockStudents = []
      mockStudents.push(mockStudent)
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByLastName').withArgs(studentLastName).yields(null, mockStudents)
      server.inject({
        method: 'GET',
        url: `/api/students/by-last-name?lastName=${studentLastName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.course).to.be.not.null()
        const jsonResponse = JSON.parse(res.payload)
        assertStudent(jsonResponse.students[0])
        done()
      }).catch(done)
    })

    it('should fail to return list of students matching by last name', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByLastName').withArgs(studentLastName).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/students/by-last-name?lastName=${studentLastName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should return students not found matching by last name error', (done) => {
      const expectedError = {
        errors: {
          404: [`Students not found with last name '${studentLastName}'`]
        }
      }
      const StudentMock = Sinon.mock(server.methods.services.students)
      StudentMock.expects('findByLastName').withArgs(studentLastName).yields(null, null)
      server.inject({
        method: 'GET',
        url: `/api/students/by-last-name?lastName=${studentLastName}`
      }).then((res) => {
        StudentMock.verify()
        StudentMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })
})
