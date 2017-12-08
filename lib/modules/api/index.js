const Pkg = require('./package.json')
const Courses = require('./courses')

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
  server.ext('onPreResponse', preResponse)

  server.route({
    path: '/health',
    method: 'GET',
    config: {
      description: 'Health Status end point',
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
      description: 'Version information of API',
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
