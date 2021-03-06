const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')

Chai.use(ChaiHttp)

// eslint-disable-next-line no-unused-vars
defineSupportCode(({ Given, When, Then }) => {
  let responseCode
  let responseData

  Given(
    /^I open the site "([^"]*)"$/, (url, callback) => {
      // eslint-disable-next-line no-undef
      Chai.request(baseUrl)
        .get(url)
        .then((res) => {
          responseCode = res.status
          responseData = res.text
          callback()
        })
        .catch((err) => {
          throw err
        })
    })

  Then(
    /^I expect the http response code to be (.+)$/, (expectedResponseCode, callback) => {
      // eslint-disable-next-line no-undef
      expect(Number(expectedResponseCode)).to.equal(responseCode)
      callback()
    })

  Then(
    /^I expect the API documentation to be present$/, (callback) => {
      // eslint-disable-next-line no-undef
      expect(responseData).to.include('APTA API Documentation')
      callback()
    })
})
