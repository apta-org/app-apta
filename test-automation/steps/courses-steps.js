const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')
const Commons = require('./common-steps')

Chai.use(ChaiHttp)
const dataMap = Commons.dataMap

defineSupportCode(({ When, Then }) => {
  let createdCourseId

  When(
    /^I make a GET request using "([^"]*)"$/, (url, callback) => {
      // eslint-disable-next-line no-undef
      Chai.request(baseUrl)
        .get(url)
        .set('content-type', 'application/json')
        .then((res) => {
          dataMap.set(Commons.RESPONSE_CODE, res.status)
          dataMap.set(Commons.RESPONSE_VALUE, JSON.parse(res.text))
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
          dataMap.set(Commons.RESPONSE_CODE, res.status)
          dataMap.set(Commons.RESPONSE_VALUE, JSON.parse(res.text))
          callback()
        })
        .catch((err) => {
          dataMap.set(Commons.RESPONSE_CODE, err.status)
          dataMap.set(Commons.RESPONSE_VALUE, JSON.parse(err.response.text))
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
          dataMap.set(Commons.RESPONSE_CODE, res.status)
          dataMap.set(Commons.RESPONSE_VALUE, JSON.parse(res.text))
          callback()
        })
        .catch((err) => {
          dataMap.set(Commons.RESPONSE_CODE, err.status)
          dataMap.set(Commons.RESPONSE_VALUE, JSON.parse(err.response.text))
          callback()
        })
    })

  When(
    /^I make a DELETE request using "([^"]*)"$/, (url, callback) => {
      url = url.replace('{id}', createdCourseId)
      Chai.request(baseUrl)
        .delete(url)
        .then((res) => {
          dataMap.set(Commons.RESPONSE_CODE, res.status)
          dataMap.set(Commons.RESPONSE_VALUE, res.text)
          callback()
        })
        .catch((err) => {
          dataMap.set(Commons.RESPONSE_CODE, err.status)
          dataMap.set(Commons.RESPONSE_VALUE, JSON.parse(err.response.text))
          callback()
        })
    })

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

  Then(
    /^the response (should|should not) contain a property "([^"]*)"$/, (expression, property, callback) => {
      const jsonResponse = dataMap.get(Commons.RESPONSE_VALUE)
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
      const jsonResponse = dataMap.get(Commons.RESPONSE_VALUE)
      expect(jsonResponse.course).to.have.property(expectedProperty, expectedPropertyValue)
      callback()
    })

  Then(
    /^the response property "([^"]*)" should be (\d+)$/, (expectedProperty, expectedPropertyValue, callback) => {
      const jsonResponse = dataMap.get(Commons.RESPONSE_VALUE)
      expect(jsonResponse.course).to.have.property(expectedProperty, expectedPropertyValue)
      callback()
    })

  Then(
    /^the response property "([^"]*)" should be (true|false)$/, (expectedProperty, expectedPropertyValue, callback) => {
      const jsonResponse = dataMap.get(Commons.RESPONSE_VALUE)
      const flag = (expectedPropertyValue === 'true')
      expect(jsonResponse.course).to.have.property(expectedProperty, flag)
      callback()
    })

  Then(
    /^I expect the response is empty$/, (callback) => {
      const jsonResponse = dataMap.get(Commons.RESPONSE_VALUE)
      expect(jsonResponse).to.equal('')
      callback()
    })

  Then(
    /^the errors response should contain payload$/, (payload, callback) => {
      const jsonResponse = dataMap.get(Commons.RESPONSE_VALUE)
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
