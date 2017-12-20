const Courses = require('./courses')
const Rules = require('./rules')
const Pkg = require('./package.json')

const register = (server, options, next) => {
  const services = [].concat(
    Courses,
    Rules
  )
  server.method(services)
  return next()
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
