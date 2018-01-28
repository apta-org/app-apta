const Code = require('code')
const Sinon = require('sinon')
const Lab = require('lab')
const Service = require('../../../lib/modules/services/members')
const Axios = require('axios')

const lab = exports.lab = Lab.script()
const describe = lab.describe
// const beforeEach = lab.beforeEach
const it = lab.it
const expect = Code.expect

describe('Service [Member]', () => {
  describe('fetch member by phone number', () => {
    const mockMembers = {
      data: [
        {
          id: 1,
          first: 'TestFirst',
          last: 'TestLast',
          email: 'first.last@gmail.com',
          mobile: '7701230000',
          membership: 'Life'
        }
      ]
    }

    it('should return a member by phone number', (done) => {
      const AxiosMock = Sinon.mock(Axios)
      AxiosMock
        .expects('get')
        .resolves(mockMembers)

      Service[0].method({ phone: '7701230000' }, (err, result) => {
        AxiosMock.verify()
        AxiosMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        expect(result[0].id).to.equal(mockMembers.data[0].id)
        expect(result[0].first).to.equal(mockMembers.data[0].first)
        expect(result[0].last).to.equal(mockMembers.data[0].last)
        expect(result[0].email).to.equal(mockMembers.data[0].email)
        expect(result[0].mobile).to.equal(mockMembers.data[0].mobile)
        expect(result[0].membership).to.equal(mockMembers.data[0].membership)
        done()
      })
    })

    it('should return a member by email', (done) => {
      const AxiosMock = Sinon.mock(Axios)
      AxiosMock
        .expects('get')
        .resolves(mockMembers)

      Service[0].method({ email: 'first.last@gmail.com' }, (err, result) => {
        AxiosMock.verify()
        AxiosMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        expect(result[0].id).to.equal(mockMembers.data[0].id)
        expect(result[0].first).to.equal(mockMembers.data[0].first)
        expect(result[0].last).to.equal(mockMembers.data[0].last)
        expect(result[0].email).to.equal(mockMembers.data[0].email)
        expect(result[0].mobile).to.equal(mockMembers.data[0].mobile)
        expect(result[0].membership).to.equal(mockMembers.data[0].membership)
        done()
      })
    })

    it('should return a member by first name', (done) => {
      const AxiosMock = Sinon.mock(Axios)
      AxiosMock
        .expects('get')
        .resolves(mockMembers)

      Service[0].method({ firstName: 'TestFirst' }, (err, result) => {
        AxiosMock.verify()
        AxiosMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        expect(result[0].id).to.equal(mockMembers.data[0].id)
        expect(result[0].first).to.equal(mockMembers.data[0].first)
        expect(result[0].last).to.equal(mockMembers.data[0].last)
        expect(result[0].email).to.equal(mockMembers.data[0].email)
        expect(result[0].mobile).to.equal(mockMembers.data[0].mobile)
        expect(result[0].membership).to.equal(mockMembers.data[0].membership)
        done()
      })
    })

    it('should return a member by last name', (done) => {
      const AxiosMock = Sinon.mock(Axios)
      AxiosMock
        .expects('get')
        .resolves(mockMembers)

      Service[0].method({ lastName: 'TestLast' }, (err, result) => {
        AxiosMock.verify()
        AxiosMock.restore()
        expect(err).to.be.null()
        expect(result).to.be.not.null()
        expect(result[0].id).to.equal(mockMembers.data[0].id)
        expect(result[0].first).to.equal(mockMembers.data[0].first)
        expect(result[0].last).to.equal(mockMembers.data[0].last)
        expect(result[0].email).to.equal(mockMembers.data[0].email)
        expect(result[0].mobile).to.equal(mockMembers.data[0].mobile)
        expect(result[0].membership).to.equal(mockMembers.data[0].membership)
        done()
      })
    })

    it('should fail to return a member due connection error with word press', (done) => {
      const AxiosMock = Sinon.mock(Axios)
      const mockError = new Error('Failed to connect to word press API')
      AxiosMock
        .expects('get')
        .resolves(mockError)

      Service[0].method({ lastName: 'TestLast' }, (err, result) => {
        AxiosMock.verify()
        AxiosMock.restore()
        expect(err).to.be.not.null()
        expect(result).to.be.null()
        done()
      })
    })
  })
})
