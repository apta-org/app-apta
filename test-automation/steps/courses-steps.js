const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')
const Commons = require('./common-steps')

Chai.use(ChaiHttp)
const dataMap = Commons.dataMap

defineSupportCode(({ Then }) => {
  Then(
    /^I expect the response contains list of courses$/, (callback) => {
      const courses = dataMap.get(Commons.RESPONSE_VALUE).courses
      expect(courses).to.be.an('array')
      expect(courses).to.have.length.above(20)
      courses.forEach((course) => {
        expect(course).to.have.all.keys('id', 'name', 'description', 'length', 'rank', 'minimumMarks', 'allowedForProgram')
      })
      callback()
    })
})
