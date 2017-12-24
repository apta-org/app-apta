const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')

Chai.use(ChaiHttp)
global.BadRequest = '400'
global.NotFound = '404'
const RESPONSE_CODE = 'RESPONSE_CODE'
const RESPONSE_VALUE = 'RESPONSE_VALUE'
const dataMap = new Map()

defineSupportCode(({ Given, When, Then }) => {
  Given(
    /^I request the API endpoint "([^"]*)"$/, (url, callback) => {
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

  When(
    /^I make a GET request using "([^"]*)"$/, (url, callback) => {
      Chai.request(baseUrl)
        .get(url)
        .set('content-type', 'application/json')
        .then((res) => {
          dataMap.set(RESPONSE_CODE, res.status)
          dataMap.set(RESPONSE_VALUE, JSON.parse(res.text))
          callback()
        })
        .catch((err) => {
          throw err
        })
    })

  Then(
    /^I expect the http (GET|PUT|POST|DELETE) response code to be (.+)$/, (requestType, expectedResponseCode, callback) => {
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
