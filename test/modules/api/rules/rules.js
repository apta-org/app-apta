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

const Rule = Mongoose.model('Rule')

const mockRules = [
  new Rule({
    id: '5a3c5a309116aecdf5b05d7e',
    course: '5a3c5a2f9116aecdf5b05d65',
    name: 'Inter',
    requiredCourseDescription: 'SSC',
    academicYear: 1,
    qualifiedMarks: 70,
    order: 1,
    enabled: true
  }),
  new Rule({
    id: '6a4c5a309116aecdf5b98d9e',
    course: '5a3c5a2f9116aecdf5b05d65',
    name: 'Inter',
    requiredCourseDescription: 'Intermediate 1st Year',
    academicYear: 2,
    qualifiedMarks: 70,
    order: 1,
    enabled: true
  }),
  new Rule({
    id: '4a3c5a309116aecdf5b98d7e',
    course: '5a3c5a2f9116aecdf5b05d65',
    name: 'Inter',
    requiredCourseDescription: 'SSC',
    academicYear: 2,
    qualifiedMarks: 70,
    order: 2,
    enabled: true
  })
]

describe('rules endpoint', () => {
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
    Object.defineProperty(server.methods.services, 'rules', {
      value: server.methods.services.rules,
      configurable: true
    })
    Object.defineProperty(server.methods.services.rules, 'findRule', {
      value: server.methods.services.rules.findRule,
      configurable: true
    })
    Object.defineProperty(server.methods.services.rules, 'findRules', {
      value: server.methods.services.rules.findRules,
      configurable: true
    })
    Object.defineProperty(server.methods.services.rules, 'findRulesByCourse', {
      value: server.methods.services.rules.findRulesByCourse,
      configurable: true
    })
    Object.defineProperty(server.methods.services.rules, 'findRulesByCourseAndAcademicYear', {
      value: server.methods.services.rules.findRulesByCourseAndAcademicYear,
      configurable: true
    })
    Object.defineProperty(server.methods.services.rules, 'create', {
      value: server.methods.services.rules.create,
      configurable: true
    })
    Object.defineProperty(server.methods.services.rules, 'update', {
      value: server.methods.services.rules.update,
      configurable: true
    })
    Object.defineProperty(server.methods.services.rules, 'delete', {
      value: server.methods.services.rules.delete,
      configurable: true
    })
    Object.defineProperty(server.methods.services, 'courses', {
      value: server.methods.services.courses,
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

  describe('GET /api/rules', () => {
    it('should return list of rules', (done) => {
      const ListMock = Sinon.mock(server.methods.services.rules)
      ListMock.expects('findRules').yields(null, mockRules)
      server.inject('/api/rules').then((res) => {
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.rules).to.be.not.null()
        expect(JSON.parse(res.payload).rules).length(3)
        done()
      }).catch(done)
    })

    it('should fail to return list of rules', (done) => {
      const mockError = new Error('Failed to connect to mongodb')
      const ListMock = Sinon.mock(server.methods.services.rules)
      ListMock.expects('findRules').yields(mockError, null)
      server.inject('/api/rules').then((res) => {
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(422)
        expect(JSON.parse(res.payload).errors.Error[0]).to.equal('Failed to connect to mongodb')
        done()
      }).catch(done)
    })
  })

  describe('GET /api/rules/{courseName}', () => {
    const courseName = 'Inter'

    it('should return list of rules by course name', (done) => {
      const ListMock = Sinon.mock(server.methods.services.rules)
      ListMock.expects('findRulesByCourse').withArgs(courseName).yields(null, mockRules)
      server.inject({
        method: 'GET',
        url: `/api/rules/${courseName}`
      }).then((res) => {
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.rules).to.be.not.null()
        expect(JSON.parse(res.payload).rules).length(3)
        done()
      }).catch(done)
    })

    it('should fail to return list of rules by course name', (done) => {
      const mockError = new Error('Failed to connect to mongodb')
      const ListMock = Sinon.mock(server.methods.services.rules)
      ListMock.expects('findRulesByCourse').withArgs(courseName).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/rules/${courseName}`
      }).then((res) => {
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(422)
        expect(JSON.parse(res.payload).errors.Error[0]).to.equal('Failed to connect to mongodb')
        done()
      }).catch(done)
    })
  })

  describe('GET /api/rules/{id}/{academicYear}', () => {
    const course = {
      _id: '5a3c5a2f9116aecdf5b05d65',
      name: 'Inter',
      description: 'Intermediate',
      length: 2,
      rank: 2,
      minimumMarks: 70,
      allowedForProgram: true
    }
    const academicYear = 1

    it('should return list of rules by course and academic year', (done) => {
      const FindCourseByIdMock = Sinon.mock(server.methods.services.courses)
      FindCourseByIdMock.expects('findById').withArgs(course._id).yields(null, course)

      const expectedResponse = []
      expectedResponse.push(mockRules[0])
      const ListMock = Sinon.mock(server.methods.services.rules)
      ListMock.expects('findRulesByCourseAndAcademicYear').withArgs(course, academicYear).yields(null, expectedResponse)
      server.inject({
        method: 'GET',
        url: `/api/rules/${course._id}/${academicYear}`
      }).then((res) => {
        FindCourseByIdMock.verify()
        FindCourseByIdMock.restore()
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(200)
        expect(res.payload.rules).to.be.not.null()
        expect(JSON.parse(res.payload).rules).length(1)
        done()
      }).catch(done)
    })

    it('should fail to return list of rules by course name', (done) => {
      const FindCourseByIdMock = Sinon.mock(server.methods.services.courses)
      FindCourseByIdMock.expects('findById').withArgs(course._id).yields(null, course)

      const mockError = new Error('Failed to connect to mongodb')
      const ListMock = Sinon.mock(server.methods.services.rules)
      ListMock.expects('findRulesByCourseAndAcademicYear').withArgs(course, academicYear).yields(mockError, null)
      server.inject({
        method: 'GET',
        url: `/api/rules/${course._id}/${academicYear}`
      }).then((res) => {
        FindCourseByIdMock.verify()
        FindCourseByIdMock.restore()
        ListMock.verify()
        ListMock.restore()
        expect(res.statusCode).to.be.equal(422)
        expect(JSON.parse(res.payload).errors.Error[0]).to.equal('Failed to connect to mongodb')
        done()
      }).catch(done)
    })
  })

  describe('PUT /api/courses/{id}', () => {
    const course = {
      _id: '5a3c5a2f9116aecdf5b05d65',
      name: 'Inter',
      description: 'Intermediate',
      length: 2,
      rank: 2,
      minimumMarks: 70,
      allowedForProgram: true
    }
    const courseId = course._id

    const payload = {
      name: mockRules[0].name,
      academicYear: mockRules[0].academicYear,
      requiredCourseDescription: mockRules[0].requiredCourseDescription,
      order: mockRules[0].order,
      enabled: mockRules[0].enabled
    }

    const methodPayload = {
      course: courseId,
      name: mockRules[0].name,
      academicYear: mockRules[0].academicYear,
      requiredCourseDescription: mockRules[0].requiredCourseDescription,
      order: mockRules[0].order,
      qualifiedMarks: mockRules[0].qualifiedMarks,
      enabled: mockRules[0].enabled
    }

    it('should create a rule and return newly created', (done) => {
      const FindCourseByIdMock = Sinon.mock(server.methods.services.courses)
      FindCourseByIdMock.expects('findById').withArgs(courseId).yields(null, course)
      const CreateMock = Sinon.mock(server.methods.services.rules)
      CreateMock.expects('create').withArgs(methodPayload).yields(null, mockRules[0])
      server.inject({
        method: 'PUT',
        payload: { rule: payload },
        url: `/api/rules/${courseId}`
      }).then((res) => {
        FindCourseByIdMock.verify()
        FindCourseByIdMock.restore()
        CreateMock.verify()
        CreateMock.restore()
        expect(res.statusCode).to.equal(201)
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.rule).to.be.not.null()
        expect(jsonResponse.rule.course).to.equal(course._id)
        expect(jsonResponse.rule.name).to.equal(payload.name)
        expect(jsonResponse.rule.requiredCourseDescription).to.equal(payload.requiredCourseDescription)
        expect(jsonResponse.rule.academicYear).to.equal(payload.academicYear)
        expect(jsonResponse.rule.qualifiedMarks).to.equal(mockRules[0].qualifiedMarks)
        expect(jsonResponse.rule.order).to.equal(payload.order)
        expect(jsonResponse.rule.enabled).to.equal(payload.enabled)
        done()
      }).catch(done)
    })

    it('should fail to create new rule and return error', (done) => {
      const mockError = {
        name: 'ValidationError',
        errors: {
          'requiredCourseDescription': {
            message: 'is already taken',
            name: 'ValidationError',
            value: 'SSC'
          },
          'academicYear': {
            message: 'is already taken',
            name: 'ValidationError',
            value: '1'
          },
          'order': {
            message: 'is already taken',
            name: 'ValidationError',
            value: '1'
          }
        }
      }
      const expectedError = {
        errors: {
          requiredCourseDescription: ['\'SSC\' is already taken'],
          academicYear: ['\'1\' is already taken'],
          order: ['\'1\' is already taken']
        }
      }

      const FindCourseByIdMock = Sinon.mock(server.methods.services.courses)
      FindCourseByIdMock.expects('findById').withArgs(courseId).yields(null, course)
      const CreateMock = Sinon.mock(server.methods.services.rules)
      CreateMock.expects('create').withArgs(methodPayload).yields(mockError, null)
      server.inject({
        method: 'PUT',
        payload: { rule: payload },
        url: `/api/rules/${courseId}`
      }).then((res) => {
        FindCourseByIdMock.verify()
        FindCourseByIdMock.restore()
        CreateMock.verify()
        CreateMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('POST /api/courses/{id}', () => {
    const ruleId = mockRules[0].id
    const payload = {
      name: mockRules[0].name,
      academicYear: mockRules[0].academicYear,
      requiredCourseDescription: mockRules[0].requiredCourseDescription,
      order: mockRules[0].order,
      enabled: false
    }

    it('should update rule and return updated', (done) => {
      const mockResponse = new Rule({
        id: ruleId,
        course: mockRules[0].course,
        name: payload.name,
        academicYear: payload.academicYear,
        requiredCourseDescription: payload.requiredCourseDescription,
        order: payload.order,
        qualifiedMarks: mockRules[0].qualifiedMarks,
        enabled: payload.enabled
      })
      mockRules[0]._id = mockRules[0].id
      delete mockRules[0].id
      const FindRuleByIdMock = Sinon.mock(server.methods.services.rules)
      FindRuleByIdMock.expects('findRule').withArgs(ruleId).yields(null, mockRules[0])
      const UpdateMock = Sinon.mock(server.methods.services.rules)
      UpdateMock.expects('update').withArgs(mockRules[0], payload).yields(null, mockResponse)
      server.inject({
        method: 'POST',
        payload: { rule: payload },
        url: `/api/rules/${ruleId}`
      }).then((res) => {
        FindRuleByIdMock.verify()
        FindRuleByIdMock.restore()
        UpdateMock.verify()
        UpdateMock.restore()
        expect(res.statusCode).to.equal(200)
        const jsonResponse = JSON.parse(res.payload)
        expect(jsonResponse.rule).to.be.not.null()
        expect(jsonResponse.rule.name).to.equal(payload.name)
        expect(jsonResponse.rule.requiredCourseDescription).to.equal(payload.requiredCourseDescription)
        expect(jsonResponse.rule.academicYear).to.equal(payload.academicYear)
        expect(jsonResponse.rule.qualifiedMarks).to.equal(mockRules[0].qualifiedMarks)
        expect(jsonResponse.rule.order).to.equal(payload.order)
        expect(jsonResponse.rule.enabled).to.equal(payload.enabled)
        done()
      }).catch(done)
    })

    it('should fail to update rule and return error', (done) => {
      const mockError = {
        name: 'ValidationError',
        errors: {
          'requiredCourseDescription': {
            message: 'is already taken',
            name: 'ValidationError',
            value: 'SSC'
          }
        }
      }
      const expectedError = {
        errors: {
          requiredCourseDescription: ['\'SSC\' is already taken']
        }
      }

      const FindRuleByIdMock = Sinon.mock(server.methods.services.rules)
      FindRuleByIdMock.expects('findRule').withArgs(ruleId).yields(null, mockRules[0])
      const UpdateMock = Sinon.mock(server.methods.services.rules)
      UpdateMock.expects('update').withArgs(mockRules[0], payload).yields(mockError, null)
      server.inject({
        method: 'POST',
        payload: { rule: payload },
        url: `/api/rules/${ruleId}`
      }).then((res) => {
        FindRuleByIdMock.verify()
        FindRuleByIdMock.restore()
        UpdateMock.verify()
        UpdateMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to update rule and return invalid rule id error', (done) => {
      const expectedError = {
        errors: {
          400: ['Invalid rule id']
        }
      }

      server.inject({
        method: 'POST',
        payload: { rule: payload },
        url: '/api/rules/junk_id'
      }).then((res) => {
        expect(res.statusCode).to.equal(400)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to update rule and return matching rule not found error', (done) => {
      const expectedError = {
        errors: {
          404: ['Rule not found']
        }
      }

      const FindRuleByIdMock = Sinon.mock(server.methods.services.rules)
      FindRuleByIdMock.expects('findRule').withArgs(ruleId).yields(null, null)

      server.inject({
        method: 'POST',
        payload: { rule: payload },
        url: `/api/rules/${ruleId}`
      }).then((res) => {
        FindRuleByIdMock.verify()
        FindRuleByIdMock.restore()
        expect(res.statusCode).to.equal(404)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })

    it('should fail to update rule and return unknown error while finding a matching rule', (done) => {
      const mockError = {
        name: '500',
        message: 'An internal server error occurred'
      }
      const expectedError = {
        errors: {
          500: ['An internal server error occurred']
        }
      }

      const FindRuleByIdMock = Sinon.mock(server.methods.services.rules)
      FindRuleByIdMock.expects('findRule').withArgs(ruleId).yields(mockError, null)

      server.inject({
        method: 'POST',
        payload: { rule: payload },
        url: `/api/rules/${ruleId}`
      }).then((res) => {
        FindRuleByIdMock.verify()
        FindRuleByIdMock.restore()
        expect(res.statusCode).to.equal(500)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })

  describe('DELETE /api/courses/{id}', () => {
    const ruleId = mockRules[0].id

    it('should a delete rule', (done) => {
      const FindRuleByIdMock = Sinon.mock(server.methods.services.rules)
      FindRuleByIdMock.expects('findRule').withArgs(ruleId).yields(null, mockRules[0])
      const DeleteMock = Sinon.mock(server.methods.services.rules)
      DeleteMock.expects('delete').withArgs(mockRules[0]).yields(null, '')
      server.inject({
        method: 'DELETE',
        url: `/api/rules/${ruleId}`
      }).then((res) => {
        FindRuleByIdMock.verify()
        FindRuleByIdMock.restore()
        DeleteMock.verify()
        DeleteMock.restore()
        expect(res.statusCode).to.equal(204)
        done()
      }).catch(done)
    })

    it('should fail to delete rule and return error', (done) => {
      const mockError = {
        name: 'MongoError',
        message: 'failed to reconnect after 30 attempts with interval 1000 ms'
      }
      const expectedError = {
        errors: {
          MongoError: ['failed to reconnect after 30 attempts with interval 1000 ms']
        }
      }

      const FindRuleByIdMock = Sinon.mock(server.methods.services.rules)
      FindRuleByIdMock.expects('findRule').withArgs(ruleId).yields(null, mockRules[0])
      const DeleteMock = Sinon.mock(server.methods.services.rules)
      DeleteMock.expects('delete').withArgs(mockRules[0]).yields(mockError, null)

      server.inject({
        method: 'DELETE',
        url: `/api/rules/${ruleId}`
      }).then((res) => {
        FindRuleByIdMock.verify()
        FindRuleByIdMock.restore()
        DeleteMock.verify()
        DeleteMock.restore()
        expect(res.statusCode).to.equal(422)
        expect(res.payload).to.be.not.null()
        expect(JSON.parse(res.payload)).to.equal(expectedError)
        done()
      }).catch(done)
    })
  })
})
