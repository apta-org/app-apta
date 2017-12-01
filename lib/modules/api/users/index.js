import Routes from './routes'
import Pkg from './package.json'

const register = (server, options, next) => {
  server.route(Routes(server))
  next()
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
