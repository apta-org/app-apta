const Code = require('code')
const Sinon = require('sinon')
const Lab = require('lab')
const Mongoose = require('mongoose')
const Service = require('../../../lib/modules/services/rules')
require('sinon-mongoose')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const beforeEach = lab.beforeEach
const it = lab.it
const expect = Code.expect

describe('Service [Rule]', () => {
  const Rule = Mongoose.model('Rule')

  describe('fetch rule by id', () => {
    it('should return a rule by id', (done) => {
      const ruleId = '5a3c5a309116aecdf5b05d7e'
      const RuleMock = Sinon.mock(Rule)
      const mockRule = {
        id: '5a3c5a309116aecdf5b05d7e',
        course: '5a3c5a2f9116aecdf5b05d65',
        name: 'Inter',
        requiredCourseDescription: 'SSC',
        academicYear: 1,
        qualifiedMarks: 70,
        order: 1,
        enabled: true
      }

      RuleMock
        .expects('findOne')
        .withArgs({ _id: ruleId })
        .chain('exec')
        .resolves(mockRule)

      Service[0].method(ruleId, (err, result) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        expect(result.course).to.equal(mockRule.course)
        expect(result.name).to.equal(mockRule.name)
        expect(result.requiredCourseDescription).to.equal(mockRule.requiredCourseDescription)
        expect(result.academicYear).to.equal(mockRule.academicYear)
        expect(result.qualifiedMarks).to.equal(mockRule.qualifiedMarks)
        expect(result.order).to.equal(mockRule.order)
        expect(result.enabled).to.equal(mockRule.enabled)
        done()
      })
    })

    it('should fail to return rule with an error', (done) => {
      const ruleId = '5a2b1f784af2a383c1368258'
      const RuleMock = Sinon.mock(Rule)
      const mockError = new Error('Failed to connect to mongodb')

      RuleMock
        .expects('findOne')
        .withArgs({ _id: ruleId })
        .chain('exec')
        .resolves(mockError)

      Service[0].method(ruleId, (err, result) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })

  describe('list rules', () => {
    it('should return list of rules', (done) => {
      const RuleMock = Sinon.mock(Rule)
      const mockRules = [
        {
          id: '5a3c5a309116aecdf5b05d7e',
          course: '5a3c5a2f9116aecdf5b05d65',
          name: 'Inter',
          requiredCourseDescription: 'SSC',
          academicYear: 1,
          qualifiedMarks: 70,
          order: 1,
          enabled: true
        },
        {
          id: '6a4c5a309116aecdf5b98d9e',
          course: '5a3c5a2f9116aecdf5b05d65',
          name: 'Inter',
          requiredCourseDescription: 'Intermediate 1st Year',
          academicYear: 2,
          qualifiedMarks: 70,
          order: 1,
          enabled: true
        },
        {
          id: '4a3c5a309116aecdf5b98d7e',
          course: '5a3c5a2f9116aecdf5b05d65',
          name: 'Inter',
          requiredCourseDescription: 'SSC',
          academicYear: 2,
          qualifiedMarks: 70,
          order: 2,
          enabled: true
        }
      ]

      RuleMock
        .expects('find').withArgs({})
        .chain('sort', { course: 1, academicYear: 1, requiredCourseDescription: 1 })
        .chain('exec')
        .resolves(mockRules)

      Service[1].method((err, results) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.null()
        expect(results).length(3)
        done()
      })
    })

    it('should not return list of rules due to an error', (done) => {
      const RuleMock = Sinon.mock(Rule)
      const mockError = new Error('Failed to connect to mongodb')

      RuleMock
        .expects('find').withArgs({})
        .chain('sort', { course: 1, academicYear: 1, requiredCourseDescription: 1 })
        .chain('exec')
        .resolves(mockError)

      Service[1].method((err, results) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.not.null()
        expect(results).to.be.null()
        done()
      })
    })
  })

  describe('list rules by course', () => {
    const courseName = 'Inter'

    it('should return list of rules by course', (done) => {
      const RuleMock = Sinon.mock(Rule)
      const mockRules = [
        {
          id: '5a3c5a309116aecdf5b05d7e',
          course: '5a3c5a2f9116aecdf5b05d65',
          name: 'Inter',
          requiredCourseDescription: 'SSC',
          academicYear: 1,
          qualifiedMarks: 70,
          order: 1,
          enabled: true
        },
        {
          id: '6a4c5a309116aecdf5b98d9e',
          course: '5a3c5a2f9116aecdf5b05d65',
          name: 'Inter',
          requiredCourseDescription: 'Intermediate 1st Year',
          academicYear: 2,
          qualifiedMarks: 70,
          order: 1,
          enabled: true
        },
        {
          id: '4a3c5a309116aecdf5b98d7e',
          course: '5a3c5a2f9116aecdf5b05d65',
          name: 'Inter',
          requiredCourseDescription: 'SSC',
          academicYear: 2,
          qualifiedMarks: 70,
          order: 2,
          enabled: true
        }
      ]

      RuleMock
        .expects('find').withArgs({ name: courseName })
        .chain('sort', { academicYear: -1, order: 1 })
        .chain('exec')
        .resolves(mockRules)

      Service[2].method(courseName, (err, results) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.null()
        expect(results).length(3)
        done()
      })
    })

    it('should not return list of rules by course due to an error', (done) => {
      const RuleMock = Sinon.mock(Rule)
      const mockError = new Error('Failed to connect to mongodb')

      RuleMock
        .expects('find').withArgs({ name: courseName })
        .chain('sort', { academicYear: -1, order: 1 })
        .chain('exec')
        .resolves(mockError)

      Service[2].method(courseName, (err, results) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.not.null()
        expect(results).to.be.null()
        done()
      })
    })
  })

  describe('list rules by course and academic year', () => {
    const course = {
      _id: '5a3c5a2f9116aecdf5b05d65',
      name: 'Inter',
      description: 'Intermediate',
      length: 2,
      rank: 2,
      minimumMarks: 70,
      allowedForProgram: true
    }

    const mockRules = [
      {
        id: '5a3c5a309116aecdf5b05d7e',
        course: course._id,
        name: 'Inter',
        requiredCourseDescription: 'SSC',
        academicYear: 1,
        qualifiedMarks: 70
      },
      {
        id: '6a4c5a309116aecdf5b98d9e',
        course: course._id,
        name: 'Inter',
        requiredCourseDescription: 'Intermediate 1st Year',
        academicYear: 2,
        qualifiedMarks: 70
      },
      {
        id: '4a3c5a309116aecdf5b98d7e',
        course: course._id,
        name: 'Inter',
        requiredCourseDescription: 'SSC',
        academicYear: 2,
        qualifiedMarks: 70
      }
    ]

    it('should return only one rule by course and academic year', (done) => {
      const RuleMock = Sinon.mock(Rule)

      const expectedRules = []
      expectedRules.push(mockRules[0])
      RuleMock
        .expects('find')
        .withArgs({ course: course, academicYear: 1, enabled: true })
        .chain('sort', { order: 1 })
        .chain('exec')
        .resolves(expectedRules)

      Service[3].method(course, 1, (err, results) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.null()
        expect(results).length(1)
        done()
      })
    })

    it('should return two rules by course and academic year', (done) => {
      const RuleMock = Sinon.mock(Rule)

      const expectedRules = []
      expectedRules.push(mockRules[1])
      expectedRules.push(mockRules[2])

      RuleMock
        .expects('find').withArgs({ course: course, academicYear: 2, enabled: true })
        .chain('sort', { order: 1 })
        .chain('exec')
        .resolves(expectedRules)

      Service[3].method(course, 2, (err, results) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.null()
        expect(results).length(2)
        done()
      })
    })

    it('should not return list of rules by course and academic year due to an error', (done) => {
      const RuleMock = Sinon.mock(Rule)
      const mockError = new Error('Failed to connect to mongodb')

      RuleMock
        .expects('find').withArgs({ course: course, academicYear: 1, enabled: true })
        .chain('sort', { order: 1 })
        .chain('exec')
        .resolves(mockError)

      Service[3].method(course, 1, (err, results) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.not.null()
        expect(results).to.be.null()
        done()
      })
    })
  })

  describe('create rule', () => {
    const payload = {
      course: '5a3c5a2f9116aecdf5b05d65',
      name: 'Inter',
      requiredCourseDescription: 'SSC',
      academicYear: 1,
      qualifiedMarks: 70,
      order: 1,
      enabled: true
    }

    beforeEach((done) => {
      Object.defineProperty(Rule.prototype, 'save', {
        value: Rule.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should create rule and return newly created', (done) => {
      const RuleMock = Sinon.mock(Rule.prototype)
      RuleMock.expects('save').yields(null, payload)

      Service[4].method(payload, (err, savedRule) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.null()
        expect(savedRule).to.be.not.null()
        expect(savedRule).not.to.be.null()
        expect(savedRule.name).to.equal(payload.name)
        expect(savedRule.requiredCourseDescription).to.equal(payload.requiredCourseDescription)
        expect(savedRule.academicYear).to.equal(payload.academicYear)
        expect(savedRule.qualifiedMarks).to.equal(payload.qualifiedMarks)
        expect(savedRule.order).to.equal(payload.order)
        expect(savedRule.enabled).to.equal(payload.enabled)
        done()
      })
    })

    it('should fail to create new rule and return error requiredCourseDescription is taken', (done) => {
      const mockError = new Error('requiredCourseDescription SSC is already taken')

      delete payload.qualifiedMarks
      const RuleMock = Sinon.mock(Rule.prototype)
      RuleMock.expects('save').yields(mockError, null)

      Service[4].method(payload, (err, savedRule) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).not.to.be.null()
        expect(savedRule).to.be.null()
        done()
      })
    })
  })

  describe('update rule', () => {
    const rule = {
      course: '5a3c5a2f9116aecdf5b05d65',
      name: 'Inter',
      requiredCourseDescription: 'SSC',
      academicYear: 1,
      qualifiedMarks: 70,
      order: 1,
      enabled: true
    }

    const payload = {
      name: 'Inter',
      requiredCourseDescription: 'SSC',
      academicYear: 1,
      order: 2,
      enabled: true
    }

    beforeEach((done) => {
      Object.defineProperty(Rule.prototype, 'save', {
        value: Rule.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should update rule and return updated', (done) => {
      const updatedPayload = Object.assign(rule)
      updatedPayload.order = 2
      const RuleMock = Sinon.mock(Rule.prototype)
      RuleMock.expects('save').yields(null, updatedPayload)

      Service[5].method(rule, payload, (err, updatedRule) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.null()
        expect(updatedRule).to.be.not.null()
        expect(updatedRule).not.to.be.null()
        expect(updatedRule.name).to.equal(updatedPayload.name)
        expect(updatedRule.requiredCourseDescription).to.equal(updatedPayload.requiredCourseDescription)
        expect(updatedRule.academicYear).to.equal(updatedPayload.academicYear)
        expect(updatedRule.qualifiedMarks).to.equal(updatedPayload.qualifiedMarks)
        expect(updatedRule.order).to.equal(updatedPayload.order)
        expect(updatedRule.enabled).to.equal(updatedPayload.enabled)
        done()
      })
    })

    it('should fail to update rule and return error requiredCourseDescription is taken', (done) => {
      const mockError = new Error('requiredCourseDescription SSC is already taken')

      delete payload.qualifiedMarks
      const RuleMock = Sinon.mock(Rule.prototype)
      RuleMock.expects('save').yields(mockError, null)

      Service[5].method(rule, payload, (err, updatedRule) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).not.to.be.null()
        expect(updatedRule).to.be.null()
        done()
      })
    })
  })

  describe('delete rule', () => {
    const rule = {
      course: '5a3c5a2f9116aecdf5b05d65',
      name: 'Inter',
      requiredCourseDescription: 'SSC',
      academicYear: 1,
      qualifiedMarks: 70,
      order: 1,
      enabled: true
    }

    beforeEach((done) => {
      Object.defineProperty(Rule.prototype, 'remove', {
        value: Rule.prototype.save,
        configurable: true
      })
      return done()
    })

    it('should delete rule and return removed rule', (done) => {
      const RuleMock = Sinon.mock(Rule.prototype)
      RuleMock.expects('remove').yields(null, rule)

      Service[6].method(rule, (err, removedRule) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).to.be.null()
        expect(removedRule).to.be.not.null()
        expect(removedRule).not.to.be.null()
        expect(removedRule.name).to.equal(rule.name)
        expect(removedRule.requiredCourseDescription).to.equal(rule.requiredCourseDescription)
        expect(removedRule.academicYear).to.equal(rule.academicYear)
        expect(removedRule.qualifiedMarks).to.equal(rule.qualifiedMarks)
        expect(removedRule.order).to.equal(rule.order)
        expect(removedRule.enabled).to.equal(rule.enabled)
        done()
      })
    })

    it('should fail to delete remove and return error', (done) => {
      const mockError = new Error('Failed to connect to mongodb')

      const RuleMock = Sinon.mock(Rule.prototype)
      RuleMock.expects('remove').yields(mockError, null)

      Service[6].method(rule, (err, deletedRule) => {
        RuleMock.verify()
        RuleMock.restore()
        expect(err).not.to.be.null()
        expect(deletedRule).to.be.null()
        done()
      })
    })
  })
})
