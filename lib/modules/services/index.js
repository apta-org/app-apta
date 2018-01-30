const Courses = require('./courses')
const Rules = require('./rules')
const Members = require('./members')
const Students = require('./students')
const States = require('./states')
const Pkg = require('./package.json')

const register = (server, options, next) => {
  const services = [].concat(
    Courses,
    Rules,
    Members,
    Students,
    States
  )
  server.method(services)
  return next()
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
