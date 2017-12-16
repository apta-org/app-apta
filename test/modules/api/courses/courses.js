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

describe('courses endpoint', () => {
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
    Object.defineProperty(server.methods.services, 'courses', {
      value: server.methods.services.courses,
      configurable: true
    })
    Object.defineProperty(server.methods.services.courses, 'list', {
      value: server.methods.services.courses.list,
      configurable: true
    })
    Object.defineProperty(server.methods.services.courses, 'create', {
      value: server.methods.services.courses.create,
      configurable: true
    })
    Object.defineProperty(server.methods.services.courses, 'update', {
      value: server.methods.services.courses.update,
      configurable: true
    })
    Object.defineProperty(server.methods.services.courses, 'delete', {
      value: server.methods.services.courses.delete,
      configurable: true
    })
    Object.defineProperty(server.methods.services.courses, 'findById', {
      value: server.methods.services.courses.findById,
      configurable: true
    })
    return done()
  })

  it('should initializes', (done) => {
    expect(server).to.exist()
    expect(LabbableServer.isInitialized()).to.equal(true)
    done()
  })

  describe('GET /api/courses', () => {
    it('should return list of courses', (done) => {
      const Course = Mongoose.model('Course')
      const course1 = new Course({
        _id: '5a2b1f784af2a383c1368234',
        name: 'SSC',
        description: 'Secondary School Certificate',
        length: 1,
        rank: 1,
        minimumMarks: 70,
        allowedForProgram: false
      })
      const course2 = new Course({
        _id: '5a2b1f784af2a383c1368212',
        name: 'Inter',
        description: 'Intermediate',
        length: 2,
        rank: 2,
        minimumMarks: 70,
        allowedForProgram: true
      })
      const mockCourses = [
        course1,
        course2
      ]

      const ListMock = Sinon.mock(server.methods.services.courses)
      ListMock.expects('list').yields(null, mockCourses)
      server.inject('/api/courses').then((res) => {
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.courses).to.be.not.null()
        expect(JSON.parse(res.payload).courses).length(2)
        done()
      }).catch(done)
    })

    it('should fail to return list of courses', (done) => {
      const mockError = new Error('Failed to connect to mongodb')
      const ListMock = Sinon.mock(server.methods.services.courses)
      ListMock.expects('list').yields(mockError, null)
      server.inject('/api/courses').then((res) => {
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(422)
        expect(JSON.parse(res.payload).errors.Error[0]).to.equal('Failed to connect to mongodb')
        done()
      }).catch(done)
    })
  })

  describe('PUT /api/courses/', () => {
    it('should create a course and return newly created', (done) => {
      const payload = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const Course = Mongoose.model('Course')
      const mockCourse = new Course(payload)
      mockCourse._id = '5a2b1f784af2a383c1368258'

      const CreateMock = Sinon.mock(server.methods.services.courses)
      CreateMock.expects('create').withArgs(payload).yields(null, mockCourse)
      server.inject({
        method: 'PUT',
        payload: { course: payload },
        url: '/api/courses'
      }).then((res) => {
        CreateMock.verify()
        CreateMock.restore()
        expect(res.statusCode).to.equal(201)
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.course).to.be.not.null()
        expect(jsonResponse.course.name).to.equal(payload.name)
        expect(jsonResponse.course.description).to.equal(payload.description)
        expect(jsonResponse.course.length).to.equal(payload.length)
        expect(jsonResponse.course.rank).to.equal(payload.rank)
        expect(jsonResponse.course.minimumMarks).to.equal(payload.minimumMarks)
        expect(jsonResponse.course.allowedForProgram).to.equal(payload.allowedForProgram)
        done()
      }).catch(done)
    })

    it('should fail to create course and return error rank is taken', (done) => {
      const payload = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 1,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const mockError = {
        name: 'ValidationError',
        errors: {
          'rank': {
            message: 'is already taken',
            name: 'ValidationError',
            value: '1'
          }
        }
      }
      const expectedError = {
        errors: {
          rank: ['\'1\' is already taken']
        }
      }

      const CreateMock = Sinon.mock(server.methods.services.courses)
      CreateMock.expects('create').withArgs(payload).yields(mockError, null)
      server.inject({
        method: 'PUT',
        payload: { course: payload },
        url: '/api/courses'
      }).then((res) => {
        CreateMock.verify()
        CreateMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to create course and return data validation error', (done) => {
      const payload = {
        name: 'CRC',
        description: 'Some new course',
        length: 'invalid_length',
        rank: 1,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const expectedError = {
        errors: {
          length: ['"length" must be a number']
        }
      }

      server.inject({
        method: 'PUT',
        payload: { course: payload },
        url: '/api/courses'
      }).then((res) => {
        expect(res.statusCode).to.equal(422)
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('DELETE /api/courses/{id}', () => {
    it('should delete a course', (done) => {
      const courseId = '5a2b1f784af2a383c1368258'
      const Course = Mongoose.model('Course')
      const foundCourseById = new Course({
        _id: courseId,
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      })

      const FindByIdMock = Sinon.mock(server.methods.services.courses)
      FindByIdMock.expects('findById').withArgs(courseId).yields(null, foundCourseById)
      const DeleteMock = Sinon.mock(server.methods.services.courses)
      DeleteMock.expects('delete').withArgs(foundCourseById).yields(null, '')

      server.inject({
        method: 'DELETE',
        url: `/api/courses/${courseId}`
      }).then((res) => {
        FindByIdMock.verify()
        FindByIdMock.restore()
        DeleteMock.verify()
        DeleteMock.restore()
        expect(res.statusCode).to.equal(204)
        done()
      }).catch(done)
    })

    it('should fail to delete course and return error', (done) => {
      const courseId = '5a2b1f784af2a383c1368258'
      const Course = Mongoose.model('Course')
      const foundCourseById = new Course({
        _id: courseId,
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      })
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }

      const FindByIdMock = Sinon.mock(server.methods.services.courses)
      FindByIdMock.expects('findById').withArgs(courseId).yields(null, foundCourseById)
      const DeleteMock = Sinon.mock(server.methods.services.courses)
      DeleteMock.expects('delete').withArgs(foundCourseById).yields(mockError, null)

      server.inject({
        method: 'DELETE',
        url: `/api/courses/${courseId}`
      }).then((res) => {
        FindByIdMock.verify()
        FindByIdMock.restore()
        DeleteMock.verify()
        DeleteMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('POST /api/courses/{id}', () => {
    it('should update a course and return updated', (done) => {
      const courseId = '5a2b1f784af2a383c1368258'
      const payload = {
        name: 'CRC',
        description: 'Some new course updated',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const Course = Mongoose.model('Course')
      const foundCourseById = new Course({
        _id: courseId,
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      })
      const expectedUpdatedCourse = new Course(payload)
      expectedUpdatedCourse.id = courseId

      const FindByIdMock = Sinon.mock(server.methods.services.courses)
      FindByIdMock.expects('findById').withArgs(courseId).yields(null, foundCourseById)
      const UpdateMock = Sinon.mock(server.methods.services.courses)
      UpdateMock.expects('update').withArgs(foundCourseById, payload).yields(null, expectedUpdatedCourse)
      server.inject({
        method: 'POST',
        payload: { course: payload },
        url: `/api/courses/${courseId}`
      }).then((res) => {
        FindByIdMock.verify()
        FindByIdMock.restore()
        UpdateMock.verify()
        UpdateMock.restore()
        expect(res.statusCode).to.equal(200)
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.course).to.be.not.null()
        expect(jsonResponse.course.name).to.equal(payload.name)
        expect(jsonResponse.course.description).to.equal(payload.description)
        expect(jsonResponse.course.length).to.equal(payload.length)
        expect(jsonResponse.course.rank).to.equal(payload.rank)
        expect(jsonResponse.course.minimumMarks).to.equal(payload.minimumMarks)
        expect(jsonResponse.course.allowedForProgram).to.equal(payload.allowedForProgram)
        done()
      }).catch(done)
    })

    it('should fail to update course and return unexpected error', (done) => {
      const courseId = '5a2b1f784af2a383c1368281'
      const payload = {
        name: 'CRC',
        description: 'Some new course updated',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const Course = Mongoose.model('Course')
      const foundCourseById = new Course({
        _id: '5a2b1f784af2a383c1368258',
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      })
      const mockError = {
        name: 'ValidationError',
        errors: {
          '500': {
            message: 'Failed to connect to mongodb',
            name: 'ValidationError',
            value: ''
          }
        }
      }
      const expectedError = {
        errors: {
          500: ['An internal server error occurred']
        }
      }

      const FindByIdMock = Sinon.mock(server.methods.services.courses)
      FindByIdMock.expects('findById').withArgs(courseId).yields(null, foundCourseById)
      const UpdateMock = Sinon.mock(server.methods.services.courses)
      UpdateMock.expects('update').withArgs(foundCourseById, payload).yields(mockError, null)

      server.inject({
        method: 'POST',
        payload: { course: payload },
        url: `/api/courses/${courseId}`
      }).then((res) => {
        FindByIdMock.verify()
        FindByIdMock.restore()
        UpdateMock.verify()
        UpdateMock.restore()
        expect(res.statusCode).to.equal(500)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to find a matching course and return invalid course id error', (done) => {
      const courseId = 'junk_id'
      const payload = {
        name: 'CRC',
        description: 'Some new course updated',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }

      const expectedError = {
        errors: {
          400: ['Invalid course id']
        }
      }

      server.inject({
        method: 'POST',
        payload: { course: payload },
        url: `/api/courses/${courseId}`
      }).then((res) => {
        expect(res.statusCode).to.equal(400)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to find a matching course and return unknown error', (done) => {
      const courseId = null
      const payload = {
        name: 'CRC',
        description: 'Some new course updated',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }

      const expectedError = {
        errors: {
          400: ['Invalid course id']
        }
      }

      server.inject({
        method: 'POST',
        payload: { course: payload },
        url: `/api/courses/${courseId}`
      }).then((res) => {
        expect(res.statusCode).to.equal(400)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to find a matching course and return course not found error', (done) => {
      const courseId = '5a2b1f784af2a383c1368281'
      const payload = {
        name: 'CRC',
        description: 'Some new course updated',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const expectedError = {
        errors: {
          404: ['Course not found']
        }
      }

      const FindByIdMock = Sinon.mock(server.methods.services.courses)
      FindByIdMock.expects('findById').withArgs(courseId).yields(null, null)

      server.inject({
        method: 'POST',
        payload: { course: payload },
        url: `/api/courses/${courseId}`
      }).then((res) => {
        FindByIdMock.verify()
        FindByIdMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })
})
