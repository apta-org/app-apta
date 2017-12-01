import Glue from 'glue'
import Labbable from 'labbable'
import manifest from './config/manifest'

const labbable = module.exports = new Labbable()
const options = {
  relativeTo: `${process.cwd()}/lib/modules`
}

Glue.compose(manifest, options, (err, server) => {
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

// exports.init = (manifest, composeOptions, next) => {
//   Glue.compose(manifest, composeOptions, (err, server) => {
//     if (err) {
//       next(err)
//     } else {
//       server.start((startErr) => {
//         next(startErr, server)
//       })
//     }
//   })
// }
