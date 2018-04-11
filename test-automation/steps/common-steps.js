const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')

Chai.use(ChaiHttp)
global.BadRequest = '400'
global.NotFound = '404'
const RESPONSE_CODE = 'RESPONSE_CODE'
const RESPONSE_VALUE = 'RESPONSE_VALUE'
const OBJECT_ID = 'OBJECT_ID'
const dataMap = new Map()

/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */
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
          dataMap.set(RESPONSE_CODE, err.status)
          dataMap.set(RESPONSE_VALUE, JSON.parse(err.response.text))
          callback()
        })
    })

  When(
    /^I make a (course|rule) POST request using "([^"]*)" with payload$/, (requestAPI, url, payload, callback) => {
      const jsonPayload = JSON.parse(payload)
      if (requestAPI === 'rule') {
        const courseId = dataMap.get(RESPONSE_VALUE).course.id
        url = url.replace('{courseId}', courseId)
      }
      Chai.request(baseUrl)
        .post(url)
        .set('content-type', 'application/json')
        .send(jsonPayload)
        .then((res) => {
          dataMap.set(RESPONSE_CODE, res.status)
          dataMap.set(RESPONSE_VALUE, JSON.parse(res.text))
          callback()
        })
        .catch((err) => {
          dataMap.set(RESPONSE_CODE, err.status)
          dataMap.set(RESPONSE_VALUE, JSON.parse(err.response.text))
          callback()
        })
    })

  When(
    /^I make an UPDATE request using "([^"]*)" with payload$/, (url, payload, callback) => {
      url = url.replace('{id}', dataMap.get(OBJECT_ID))
      const jsonPayload = JSON.parse(payload)
      Chai.request(baseUrl)
        .put(url)
        .set('content-type', 'application/json')
        .send(jsonPayload)
        .then((res) => {
          dataMap.set(RESPONSE_CODE, res.status)
          dataMap.set(RESPONSE_VALUE, JSON.parse(res.text))
          callback()
        })
        .catch((err) => {
          dataMap.set(RESPONSE_CODE, err.status)
          dataMap.set(RESPONSE_VALUE, JSON.parse(err.response.text))
          callback()
        })
    })

  When(
    /^I make a DELETE request using "([^"]*)"$/, (url, callback) => {
      url = url.replace('{id}', dataMap.get(OBJECT_ID))
      Chai.request(baseUrl)
        .delete(url)
        .then((res) => {
          dataMap.set(RESPONSE_CODE, res.status)
          dataMap.set(RESPONSE_VALUE, res.text)
          callback()
        })
        .catch((err) => {
          dataMap.set(RESPONSE_CODE, err.status)
          dataMap.set(RESPONSE_VALUE, JSON.parse(err.response.text))
          callback()
        })
    })

  Then(
    /^I expect the http (GET|PUT|POST|DELETE) response code to be (.+)$/, (requestType, expectedResponseCode, callback) => {
      const responseCode = dataMap.get(RESPONSE_CODE)
      expect(Number(expectedResponseCode)).to.equal(responseCode)
      callback()
    })

  Then(
    /^the (course|rule|student) response (should|should not) contain a property "([^"]*)"$/, (objectName, expression, property, callback) => {
      const jsonResponse = dataMap.get(RESPONSE_VALUE)
      expect(eval(`jsonResponse.${objectName}`)).to.be.an('object')
      if (expression === 'should not') {
        expect(eval(`jsonResponse.${objectName}`)).to.not.have.property(property)
      } else {
        expect(eval(`jsonResponse.${objectName}`)).to.have.property(property)
        dataMap.set(OBJECT_ID, eval(`jsonResponse.${objectName}.id`))
      }
      callback()
    })

  Then(
    /^the (course|rule|student) response property "([^"]*)" should be "([^"]*)"/, (objectName, expectedProperty, expectedPropertyValue, callback) => {
      const jsonResponse = dataMap.get(RESPONSE_VALUE)
      expect(eval(`jsonResponse.${objectName}`)).to.have.property(expectedProperty, expectedPropertyValue)
      callback()
    })

  Then(
    /^the (course|rule) response property "([^"]*)" should be (\d+)$/, (objectName, expectedProperty, expectedPropertyValue, callback) => {
      const jsonResponse = dataMap.get(RESPONSE_VALUE)
      expect(eval(`jsonResponse.${objectName}`)).to.have.property(expectedProperty, expectedPropertyValue)
      callback()
    })

  Then(
    /^the (course|rule) response property "([^"]*)" should be (true|false)$/, (objectName, expectedProperty, expectedPropertyValue, callback) => {
      const jsonResponse = dataMap.get(RESPONSE_VALUE)
      const flag = (expectedPropertyValue === 'true')
      expect(eval(`jsonResponse.${objectName}`)).to.have.property(expectedProperty, flag)
      callback()
    })

  Then(
    /^I expect the response is empty$/, (callback) => {
      const jsonResponse = dataMap.get(RESPONSE_VALUE)
      expect(jsonResponse).to.equal('')
      callback()
    })

  Then(
    /^the errors response should contain payload$/, (payload, callback) => {
      const jsonResponse = dataMap.get(RESPONSE_VALUE)
      const collectedErrors = []
      const expectedPayload = JSON.parse(payload)
      if (expectedPayload.errors.name) {
        collectedErrors.push(jsonResponse.errors)
        expect(jsonResponse.errors.name[0]).to.equal(expectedPayload.errors.name[0])
      }
      if (expectedPayload.errors.description) {
        collectedErrors.push(jsonResponse.errors)
        expect(jsonResponse.errors.description[0]).to.equal(expectedPayload.errors.description[0])
      }
      if (expectedPayload.errors.rank) {
        collectedErrors.push(jsonResponse.errors)
        expect(jsonResponse.errors.rank[0]).to.equal(expectedPayload.errors.rank[0])
      }
      if (expectedPayload.errors.length) {
        collectedErrors.push(jsonResponse.errors)
        expect(jsonResponse.errors.length[0]).to.equal(expectedPayload.errors.length[0])
      }
      if (expectedPayload.errors.minimumMarks) {
        collectedErrors.push(jsonResponse.errors)
        expect(jsonResponse.errors.minimumMarks[0]).to.equal(expectedPayload.errors.minimumMarks[0])
      }
      if (expectedPayload.errors.allowedForProgram) {
        collectedErrors.push(jsonResponse.errors)
        expect(jsonResponse.errors.allowedForProgram[0]).to.equal(expectedPayload.errors.allowedForProgram[0])
      }
      if (expectedPayload.errors.phone) {
        collectedErrors.push(jsonResponse.errors)
        expect(jsonResponse.errors.phone[0]).to.equal(expectedPayload.errors.phone[0])
      }
      if (`expectedPayload.errors.${BadRequest}` || `expectedPayload.errors.${NotFound}`) {
        collectedErrors.push(jsonResponse.errors)
        expect(jsonResponse.errors).to.deep.equal(expectedPayload.errors)
      }

      if (!collectedErrors || collectedErrors.length === 0) {
        expect.fail(payload, jsonResponse, 'Unknown error received')
      }
      callback()
    })
})

module.exports = {
  dataMap,
  RESPONSE_CODE,
  RESPONSE_VALUE,
  OBJECT_ID
}
