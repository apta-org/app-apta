import chai from 'chai'
import chaiHttp from 'chai-http'
import { defineSupportCode } from 'cucumber'

chai.use(chaiHttp)

defineSupportCode(({ Given, When, Then }) => {
  let responseCode
  let responseData

  Given(/^I open the site "([^"]*)"$/, (url, callback) => {
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
      expect(Number(expectedResponseCode)).to.equal(responseCode)
      callback()
    })

  Then(
    /^I expect the API documentation to be present$/, (callback) => {
      expect(responseData).to.include('APTA API Documentation')
      callback()
    })
})
