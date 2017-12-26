const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')
const Commons = require('./common-steps')

Chai.use(ChaiHttp)
const dataMap = Commons.dataMap

defineSupportCode(({ Then }) => {
  Then(
    /^I expect the response contains list of rules$/, (callback) => {
      const rules = dataMap.get(Commons.RESPONSE_VALUE).rules
      expect(rules).to.be.an('array')
      expect(rules).to.have.length.above(0)
      rules.forEach((rule) => {
        expect(rule).to.have.all.keys('id', 'course', 'name', 'requiredCourseDescription', 'academicYear', 'qualifiedMarks', 'order', 'enabled')
      })
      callback()
    })

  Then(
    /^I expect the response contains list of rules for (.+)$/, (courseName, callback) => {
      const rules = dataMap.get(Commons.RESPONSE_VALUE).rules
      expect(rules).to.be.an('array')
      expect(rules).to.have.length.above(0)
      rules.forEach((rule) => {
        expect(rule).to.have.all.keys('id', 'course', 'name', 'requiredCourseDescription', 'academicYear', 'qualifiedMarks', 'order', 'enabled')
        expect(rule.name).to.equal(courseName)
      })
      callback()
    })

  Then(
    /^I use the courseId to fetch rules using "([^"]*)"$/, (url, callback) => {
      const courseId = dataMap.get(Commons.RESPONSE_VALUE).course.id
      url = url.replace('{courseId}', courseId)
      Chai.request(baseUrl)
        .get(url)
        .set('content-type', 'application/json')
        .then((res) => {
          dataMap.set(Commons.RESPONSE_CODE, res.status)
          dataMap.set(Commons.RESPONSE_VALUE, JSON.parse(res.text))
          callback()
        })
        .catch((err) => {
          throw err
        })
    })

  Then(
    /^I expect the rules response contains list of rules for (.+) and count to be (.+)$/, (courseName, ruleCount, callback) => {
      const rules = dataMap.get(Commons.RESPONSE_VALUE).rules
      expect(rules).to.be.an('array')
      expect(rules.length).to.equal(Number(ruleCount))
      rules.forEach((rule) => {
        expect(rule).to.have.all.keys('id', 'course', 'name', 'requiredCourseDescription', 'academicYear', 'qualifiedMarks')
        expect(rule.name).to.equal(courseName)
      })
      callback()
    })

  Then(
    /^I use rule with requiredCourseDescription "([^"]*)"$/, (description, callback) => {
      const rules = dataMap.get(Commons.RESPONSE_VALUE).rules
      expect(rules).to.be.an('array')
      rules.forEach((rule) => {
        if (rule.requiredCourseDescription === description) {
          expect(rule).to.have.all.keys('id', 'course', 'name', 'requiredCourseDescription', 'academicYear', 'qualifiedMarks', 'order', 'enabled')
          dataMap.set(Commons.OBJECT_ID, rule.id)
        }
      })
      callback()
    })
})
