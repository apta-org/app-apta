const Chai = require('chai')
const ChaiHttp = require('chai-http')
const { defineSupportCode } = require('cucumber')

Chai.use(ChaiHttp)
global.BadRequest = '400'
global.NotFound = '404'

// eslint-disable-next-line no-unused-vars
defineSupportCode(({ Given }) => {
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
})
