const Axios = require('axios')
const Config = require('../../config/index')

const MembershipEndPoint = Config.env !== 'production' ? 'http://localhost:9999' : 'http://apta17.jidugu.com/wp-json/'

const buildQueryParameters = (queryParams) => {
  const parameters = {}

  if (queryParams.phone) {
    parameters.mobile = queryParams.phone
  }

  if (queryParams.email) {
    parameters.email = queryParams.email
  }

  if (queryParams.firstName) {
    parameters.first = queryParams.firstName
  }

  if (queryParams.lastName) {
    parameters.last = queryParams.lastName
  }

  return parameters
}

const findMember = (queryParameters, callback) => {
  Axios.get(`${MembershipEndPoint}/members`, {
    params: buildQueryParameters(queryParameters)
  }).then((res) => {
    callback(null, res.data)
  }).catch((err) => {
    callback(err, null)
  })
}

module.exports = [
  {
    name: 'services.members.findMember',
    method: findMember
  }
]
