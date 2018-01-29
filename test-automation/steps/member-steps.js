const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')
const Commons = require('./common-steps')

Chai.use(ChaiHttp)
const dataMap = Commons.dataMap

defineSupportCode(({ Then }) => {
  Then(
    /^the members response should contain payload$/, (payload, callback) => {
      const jsonResponse = dataMap.get(Commons.RESPONSE_VALUE)
      const expectedPayload = JSON.parse(payload)
      expect(jsonResponse.members.length).to.equal(expectedPayload.members.length)
      if (expectedPayload.members.length > 0) {
        const expectedMember = expectedPayload.members[0]
        expect(jsonResponse.members[0].id).to.equal(expectedMember.id)
        expect(jsonResponse.members[0].first).to.equal(expectedMember.first)
        expect(jsonResponse.members[0].last).to.equal(expectedMember.last)
        expect(jsonResponse.members[0].email).to.equal(expectedMember.email)
        expect(jsonResponse.members[0].mobile).to.equal(expectedMember.mobile)
        expect(jsonResponse.members[0].membership).to.equal(expectedMember.membership)
      }
      callback()
    })
})
