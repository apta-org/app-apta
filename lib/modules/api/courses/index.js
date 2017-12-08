const Routes = require('./routes')
const Pkg = require('./package.json')

const register = (server, options, next) => {
  server.route(Routes(server))
  next()
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
