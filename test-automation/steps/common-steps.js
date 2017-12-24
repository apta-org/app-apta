const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')

Chai.use(ChaiHttp)
global.BadRequest = '400'
global.NotFound = '404'
const RESPONSE_CODE = 'RESPONSE_CODE'
const RESPONSE_VALUE = 'RESPONSE_VALUE'
const dataMap = new Map()

// eslint-disable-next-line no-unused-vars
defineSupportCode(({ Given, Then }) => {
  Given(
    /^I request the API endpoint "([^"]*)"$/, (url, callback) => {
      // eslint-disable-next-line no-undef
      Chai.request(baseUrl)
        .get('')
        .then((res) => {
          expect(res.status).to.equal(200)
          callback()
        })
        .catch((err) => {
          throw err
        })
    })

  Then(
    /^I expect the http (GET|PUT|POST|DELETE) response code to be (.+)$/, (requestType, expectedResponseCode, callback) => {
      // eslint-disable-next-line no-undef
      const responseCode = dataMap.get(RESPONSE_CODE)
      expect(Number(expectedResponseCode)).to.equal(responseCode)
      callback()
    })
})

module.exports = {
  dataMap,
  RESPONSE_CODE,
  RESPONSE_VALUE
}
