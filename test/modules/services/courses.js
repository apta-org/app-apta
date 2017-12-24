const Code = require('code')
const Sinon = require('sinon')
const Lab = require('lab')
const Mongoose = require('mongoose')
const Service = require('../../../lib/modules/services/courses')
require('sinon-mongoose')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const beforeEach = lab.beforeEach
const it = lab.it
const expect = Code.expect

describe('Service [Course]', () => {
  const Course = Mongoose.model('Course')

  describe('fetch course by id', () => {
    it('should return a course by id', (done) => {
      const courseId = '5a2b1f784af2a383c1368258'
      const CourseMock = Sinon.mock(Course)
      const mockCourse = {
        name: 'SSC',
        description: 'Secondary School Certificate',
        length: 1,
        rank: 1,
        minimumMarks: 70,
        allowedForProgram: false
      }

      CourseMock
        .expects('findOne')
        .withArgs({ _id: courseId })
        .chain('exec')
        .resolves(mockCourse)

      Service[0].method(courseId, (err, result) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        expect(result.name).to.equal(mockCourse.name)
        expect(result.description).to.equal(mockCourse.description)
        expect(result.rank).to.equal(mockCourse.rank)
        expect(result.length).to.equal(mockCourse.length)
        expect(result.minimumMarks).to.equal(mockCourse.minimumMarks)
        expect(result.allowedForProgram).to.equal(mockCourse.allowedForProgram)
        done()
      })
    })

    it('should fail to return course with an error', (done) => {
      const courseId = '5a2b1f784af2a383c1368258'
      const CourseMock = Sinon.mock(Course)
      const mockError = new Error('Failed to connect to mongodb')

      CourseMock
        .expects('findOne')
        .withArgs({ _id: courseId })
        .chain('exec')
        .resolves(mockError)

      Service[0].method(courseId, (err, result) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('fetch course by name', () => {
    it('should return a course by name', (done) => {
      const courseName = 'SSC'
      const CourseMock = Sinon.mock(Course)
      const mockCourse = {
        name: 'SSC',
        description: 'Secondary School Certificate',
        length: 1,
        rank: 1,
        minimumMarks: 70,
        allowedForProgram: false
      }

      CourseMock
        .expects('findOne')
        .withArgs({ name: courseName })
        .chain('exec')
        .resolves(mockCourse)

      Service[5].method(courseName, (err, result) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        expect(result.name).to.equal(mockCourse.name)
        expect(result.description).to.equal(mockCourse.description)
        expect(result.rank).to.equal(mockCourse.rank)
        expect(result.length).to.equal(mockCourse.length)
        expect(result.minimumMarks).to.equal(mockCourse.minimumMarks)
        expect(result.allowedForProgram).to.equal(mockCourse.allowedForProgram)
        done()
      })
    })

    it('should fail to return course by name with an error', (done) => {
      const courseName = 'SSC'
      const CourseMock = Sinon.mock(Course)
      const mockError = new Error('Failed to connect to mongodb')

      CourseMock
        .expects('findOne')
        .withArgs({ name: courseName })
        .chain('exec')
        .resolves(mockError)

      Service[5].method(courseName, (err, result) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('list courses', () => {
    it('should return list of courses', (done) => {
      const CourseMock = Sinon.mock(Course)
      const mockCourses = [
        {
          name: 'SSC',
          description: 'Secondary School Certificate',
          length: 1,
          rank: 1,
          minimumMarks: 70,
          allowedForProgram: false
        },
        {
          name: 'Inter',
          description: 'Intermediate',
          length: 2,
          rank: 2,
          minimumMarks: 70,
          allowedForProgram: true
        }
      ]

      CourseMock
        .expects('find').withArgs({})
        .chain('sort', { rank: 1 })
        .chain('select', 'name description length rank')
        .chain('exec')
        .resolves(mockCourses)

      Service[1].method((err, results) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.null()
        expect(results).length(2)
        done()
      })
    })

    it('should not return list of courses due to an error', (done) => {
      const CourseMock = Sinon.mock(Course)
      const mockError = new Error('Failed to connect to mongodb')

      CourseMock
        .expects('find').withArgs({})
        .chain('sort', { rank: 1 })
        .chain('select', 'name description length rank')
        .chain('exec')
        .resolves(mockError)

      Service[1].method((err, results) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.not.null()
        expect(results).to.be.null()
        done()
      })
    })
  })

  describe('create course', () => {
    beforeEach((done) => {
      Object.defineProperty(Course.prototype, 'save', {
        value: Course.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should create course and return newly created', (done) => {
      const payload = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }

      const CourseMock = Sinon.mock(Course.prototype)
      CourseMock.expects('save').yields(null, payload)

      Service[2].method(payload, (err, savedCourse) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.null()
        expect(savedCourse).to.be.not.null()
        expect(savedCourse).not.to.be.null()
        expect(savedCourse.name).to.equal(payload.name)
        expect(savedCourse.description).to.equal(payload.description)
        expect(savedCourse.length).to.equal(payload.length)
        expect(savedCourse.rank).to.equal(payload.rank)
        expect(savedCourse.minimumMarks).to.equal(payload.minimumMarks)
        expect(savedCourse.allowedForProgram).to.equal(payload.allowedForProgram)
        done()
      })
    })

    it('should fail to create new course and return error rank is taken', (done) => {
      const payload = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 1,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const mockError = new Error('rank 1 is already taken')

      const CourseMock = Sinon.mock(Course.prototype)
      CourseMock.expects('save').yields(mockError, null)

      Service[2].method(payload, (err, savedCourse) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).not.to.be.null()
        expect(savedCourse).to.be.null()
        done()
      })
    })
  })

  describe('delete course', () => {
    beforeEach((done) => {
      Object.defineProperty(Course.prototype, 'remove', {
        value: Course.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should delete course and return removed course', (done) => {
      const payload = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }

      const CourseMock = Sinon.mock(Course.prototype)
      CourseMock.expects('remove').yields(null, payload)

      Service[3].method(payload, (err, deletedCourse) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.null()
        expect(deletedCourse).to.be.not.null()
        expect(deletedCourse).not.to.be.null()
        expect(deletedCourse.name).to.equal(payload.name)
        expect(deletedCourse.description).to.equal(payload.description)
        expect(deletedCourse.length).to.equal(payload.length)
        expect(deletedCourse.rank).to.equal(payload.rank)
        expect(deletedCourse.minimumMarks).to.equal(payload.minimumMarks)
        expect(deletedCourse.allowedForProgram).to.equal(payload.allowedForProgram)
        done()
      })
    })

    it('should fail to delete course and return error', (done) => {
      const payload = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 1,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const mockError = new Error('Failed to connect to mongodb')

      const CourseMock = Sinon.mock(Course.prototype)
      CourseMock.expects('remove').yields(mockError, null)

      Service[3].method(payload, (err, deletedCourse) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).not.to.be.null()
        expect(deletedCourse).to.be.null()
        done()
      })
    })
  })

  describe('update course', () => {
    beforeEach((done) => {
      Object.defineProperty(Course.prototype, 'save', {
        value: Course.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should update course and return updated', (done) => {
      const course = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const payload = {
        name: 'CRC',
        description: 'Some new course updated',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const CourseMock = Sinon.mock(Course.prototype)
      CourseMock.expects('save').yields(null, payload)

      Service[4].method(course, payload, (err, updatedCourse) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).to.be.null()
        expect(updatedCourse).to.be.not.null()
        expect(updatedCourse).not.to.be.null()
        expect(updatedCourse.name).to.equal(payload.name)
        expect(updatedCourse.description).to.equal(payload.description)
        expect(updatedCourse.length).to.equal(payload.length)
        expect(updatedCourse.rank).to.equal(payload.rank)
        expect(updatedCourse.minimumMarks).to.equal(payload.minimumMarks)
        expect(updatedCourse.allowedForProgram).to.equal(payload.allowedForProgram)
        done()
      })
    })

    it('should fail to update course and return error rank is taken', (done) => {
      const course = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 100,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const payload = {
        name: 'CRC',
        description: 'Some new course',
        length: 4,
        rank: 1,
        minimumMarks: 70,
        allowedForProgram: false
      }
      const mockError = new Error('rank 1 is already taken')

      const CourseMock = Sinon.mock(Course.prototype)
      CourseMock.expects('save').yields(mockError, null)

      Service[4].method(course, payload, (err, updatedCourse) => {
        CourseMock.verify()
        CourseMock.restore()
        expect(err).not.to.be.null()
        expect(updatedCourse).to.be.null()
        done()
      })
    })
  })
})
