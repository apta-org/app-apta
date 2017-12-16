const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')

Chai.use(ChaiHttp)

// eslint-disable-next-line no-unused-vars
defineSupportCode(({ Given, When, Then }) => {
  let responseCode
  let jsonResponse
  let createdCourseId

  When(
    /^I make a GET request using "([^"]*)"$/, (url, callback) => {
      // eslint-disable-next-line no-undef
      Chai.request(baseUrl)
        .get(url)
        .set('content-type', 'application/json')
        .then((res) => {
          responseCode = res.status
          jsonResponse = JSON.parse(res.text)
          callback()
        })
        .catch((err) => {
          throw err
        })
    })

  When(
    /^I make a PUT request using "([^"]*)" with payload$/, (url, payload, callback) => {
      const jsonPayload = JSON.parse(payload)
      Chai.request(baseUrl)
        .put(url)
        .set('content-type', 'application/json')
        .send(jsonPayload)
        .then((res) => {
          responseCode = res.status
          jsonResponse = JSON.parse(res.text)
          callback()
        })
        .catch((err) => {
          responseCode = err.status
          jsonResponse = JSON.parse(err.response.text)
          callback()
        })
    })

  When(
    /^I make an UPDATE request using "([^"]*)" with payload$/, (url, payload, callback) => {
      url = url.replace('{id}', createdCourseId)
      const jsonPayload = JSON.parse(payload)
      Chai.request(baseUrl)
        .post(url)
        .set('content-type', 'application/json')
        .send(jsonPayload)
        .then((res) => {
          responseCode = res.status
          jsonResponse = JSON.parse(res.text)
          callback()
        })
        .catch((err) => {
          responseCode = err.status
          jsonResponse = JSON.parse(err.response.text)
          callback()
        })
    })

  When(
    /^I make a DELETE request using "([^"]*)"$/, (url, callback) => {
      url = url.replace('{id}', createdCourseId)
      Chai.request(baseUrl)
        .delete(url)
        .then((res) => {
          responseCode = res.status
          jsonResponse = res.text
          callback()
        })
        .catch((err) => {
          responseCode = err.status
          jsonResponse = JSON.parse(err.response.text)
          callback()
        })
    })

  Then(
    /^I expect the http (GET|PUT|POST|DELETE) response code to be (.+)$/, (requestType, expectedResponseCode, callback) => {
      // eslint-disable-next-line no-undef
      expect(Number(expectedResponseCode)).to.equal(responseCode)
      callback()
    })

  Then(
    /^I expect the response contains list of courses$/, (callback) => {
      // eslint-disable-next-line no-undef
      const courses = jsonResponse.courses
      expect(courses).to.be.an('array')
      expect(courses).to.have.length.above(20)
      courses.forEach((course) => {
        expect(course).to.have.all.keys('id', 'name', 'description', 'length', 'rank', 'minimumMarks', 'allowedForProgram')
      })
      callback()
    })

  Then(
    /^the response (should|should not) contain a property "([^"]*)"$/, (expression, property, callback) => {
      expect(jsonResponse.course).to.be.an('object')
      if (expression === 'should not') {
        expect(jsonResponse.course).to.not.have.property(property)
      } else {
        expect(jsonResponse.course).to.have.property(property)
        createdCourseId = jsonResponse.course.id
      }
      callback()
    })

  Then(
    /^the response property "([^"]*)" should be "([^"]*)"/, (expectedProperty, expectedPropertyValue, callback) => {
      expect(jsonResponse.course).to.have.property(expectedProperty, expectedPropertyValue)
      callback()
    })

  Then(
    /^the response property "([^"]*)" should be (\d+)$/, (expectedProperty, expectedPropertyValue, callback) => {
      expect(jsonResponse.course).to.have.property(expectedProperty, expectedPropertyValue)
      callback()
    })

  Then(
    /^the response property "([^"]*)" should be (true|false)$/, (expectedProperty, expectedPropertyValue, callback) => {
      const flag = (expectedPropertyValue === 'true')
      expect(jsonResponse.course).to.have.property(expectedProperty, flag)
      callback()
    })

  Then(
    /^I expect the response is empty$/, (callback) => {
      expect(jsonResponse).to.equal('')
      callback()
    })

  Then(
    /^the errors response should contain payload$/, (payload, callback) => {
      let atLeastOneErrorReceived = false
      const expectedPayload = JSON.parse(payload)
      if (expectedPayload.errors.name) {
        atLeastOneErrorReceived = true
        expect(jsonResponse.errors.name[0]).to.equal(expectedPayload.errors.name[0])
      }
      if (expectedPayload.errors.description) {
        atLeastOneErrorReceived = true
        expect(jsonResponse.errors.description[0]).to.equal(expectedPayload.errors.description[0])
      }
      if (expectedPayload.errors.rank) {
        atLeastOneErrorReceived = true
        expect(jsonResponse.errors.rank[0]).to.equal(expectedPayload.errors.rank[0])
      }
      if (expectedPayload.errors.length) {
        atLeastOneErrorReceived = true
        expect(jsonResponse.errors.length[0]).to.equal(expectedPayload.errors.length[0])
      }
      if (expectedPayload.errors.minimumMarks) {
        atLeastOneErrorReceived = true
        expect(jsonResponse.errors.minimumMarks[0]).to.equal(expectedPayload.errors.minimumMarks[0])
      }
      if (expectedPayload.errors.allowedForProgram) {
        atLeastOneErrorReceived = true
        expect(jsonResponse.errors.allowedForProgram[0]).to.equal(expectedPayload.errors.allowedForProgram[0])
      }
      if (`expectedPayload.errors.${BadRequest}` || `expectedPayload.errors.${NotFound}`) {
        atLeastOneErrorReceived = true
        expect(jsonResponse.errors).to.deep.equal(expectedPayload.errors)
      }

      if (atLeastOneErrorReceived === false) {
        expect.fail(payload, jsonResponse, 'Unknown error received')
      }
      callback()
    })
})
