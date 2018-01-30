const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')
const Commons = require('./common-steps')

Chai.use(ChaiHttp)
const dataMap = Commons.dataMap

defineSupportCode(({ Then }) => {
  Then(
    /^I expect the response contains list of states$/, (callback) => {
      const states = dataMap.get(Commons.RESPONSE_VALUE).states
      expect(states).to.be.an('array')
      expect(states).to.have.length.above(0)
      states.forEach((state) => {
        expect(state).to.have.all.keys('id', 'name', 'districts')
        expect(state.districts).to.have.length.above(10)
      })
      callback()
    })
})
