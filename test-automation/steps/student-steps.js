const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')
const Commons = require('./common-steps')

Chai.use(ChaiHttp)
const dataMap = Commons.dataMap

defineSupportCode(({ When }) => {
  When(
    /^I make a student POST request using "([^"]*)" with payload$/, (url, payload, callback) => {
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
})
