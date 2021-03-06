const Pkg = require('./package.json')
const Courses = require('./courses')
const Rules = require('./rules')
const Members = require('./members')
const Students = require('./students')
const StudentReferrals = require('./student-referrals')
const States = require('./states')

const register = (server, options, next) => {
  const preResponse = (request, reply) => {
    const response = request.response
    if (response.isBoom) {
      const reformatted = { errors: {} }
      reformatted.errors[response.output.statusCode] = [response.output.payload.message]
      return reply(reformatted).code(response.output.statusCode)
    }
    return reply.continue()
  }

  server.register(Courses)
  server.register(Rules)
  server.register(Members)
  server.register(Students)
  server.register(StudentReferrals)
  server.register(States)
  server.ext('onPreResponse', preResponse)

  server.route({
    path: '/health',
    method: 'GET',
    config: {
      description: 'Get health status',
      notes: 'Return the current status of the API',
      tags: ['api', 'health']
    },
    handler: (request, reply) => {
      reply({ status: 'UP' })
    }
  })

  server.route({
    method: 'GET',
    path: '/version',
    config: {
      description: 'Get current version of the API',
      notes: 'Returns the version of the API',
      tags: ['api', 'version']
    },
    handler: (request, reply) => {
      reply({ version: Pkg.version })
    }
  })

  return next()
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
