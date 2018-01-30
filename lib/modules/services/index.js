const Courses = require('./courses')
const Rules = require('./rules')
const Members = require('./members')
const Students = require('./students')
const Pkg = require('./package.json')

const register = (server, options, next) => {
  const services = [].concat(
    Courses,
    Rules,
    Members,
    Students
  )
  server.method(services)
  return next()
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
