const Courses = require('./courses')
const Pkg = require('./package.json')

const register = (server, options, next) => {
  const services = [].concat(
    Courses
  )
  server.method(services)
  return next()
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
