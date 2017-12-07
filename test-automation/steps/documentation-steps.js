import chai from 'chai'
import chaiHttp from 'chai-http'
import { defineSupportCode } from 'cucumber'

chai.use(chaiHttp)

// eslint-disable-next-line no-unused-vars
defineSupportCode(({ Given, When, Then }) => {
  let responseCode
  let responseData

  Given(/^I open the site "([^"]*)"$/, (url, callback) => {
    // eslint-disable-next-line no-undef
    chai.request(baseUrl)
      .get('/')
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
