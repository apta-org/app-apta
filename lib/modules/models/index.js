import mongoose from 'mongoose'
import config from '../../config'
// eslint-disable-next-line no-unused-vars
import Course from './course'
import Pkg from './package.json'

const register = (server, options, next) => {
  mongoose.Promise = Promise
  mongoose.connect(config.database.uri, config.database.options, (err, db) => {
    if (err) {
      console.log(err)
    }
    console.log('Successfully connected to MongoDB:', config.database.uri)
    server.app.db = {
      link: db.db,
      Course: db.model('Course')
    }
    next()
  })
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
