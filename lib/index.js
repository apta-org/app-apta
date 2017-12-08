const Glue = require('glue')
const Labbable = require('labbable')
const Manifest = require('./config/manifest')

const labbable = module.exports = new Labbable()
const options = {
  relativeTo: `${process.cwd()}/lib/modules`
}

Glue.compose(Manifest, options, (err, server) => {
  if (err) {
    throw err
  }

  if (process.env.NODE_ENV === 'test') {
    labbable.using(server)
  }

  server.initialize((err) => {
    if (err) {
      throw err
    }

    if (process.env.NODE_ENV === 'test') {
      if (module.parent) {
        return
      }
    }

    server.start((err) => {
      if (err) {
        throw err
      }
      console.log('Server started')
    })
  })
})
