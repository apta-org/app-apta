const Code = require('code')
const Sinon = require('sinon')
const Lab = require('lab')
const Mongoose = require('mongoose')
const Service = require('../../../lib/modules/services/states')
require('sinon-mongoose')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

describe('Service [State]', () => {
  const State = Mongoose.model('State')

  describe('list states along with districts', () => {
    it('should return list of states', (done) => {
      const StateMock = Sinon.mock(State)
      const mockStates = [
        {
          name: 'Andhra Pradesh',
          districts: [
            'East Godavari Dist',
            'West Godavari Dist'
          ]
        },
        {
          name: 'Telangana',
          districts: [
            'Hyderabad Dist',
            'Rangareddy Dist'
          ]
        }
      ]

      StateMock
        .expects('find').withArgs({})
        .chain('sort', { name: 1 })
        .chain('exec')
        .resolves(mockStates)

      Service[0].method((err, results) => {
        StateMock.verify()
        StateMock.restore()
        expect(err).to.be.null()
        expect(results).length(2)
        done()
      })
    })

    it('should not return list of states due to an error', (done) => {
      const StateMock = Sinon.mock(State)
      const mockError = new Error('Failed to connect to mongodb')

      StateMock
        .expects('find').withArgs({})
        .chain('sort', { name: 1 })
        .chain('exec')
        .resolves(mockError)

      Service[0].method((err, results) => {
        StateMock.verify()
        StateMock.restore()
        expect(err).to.be.not.null()
        expect(results).to.be.null()
        done()
      })
    })
  })
})
