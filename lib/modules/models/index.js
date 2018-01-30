const Mongoose = require('mongoose')
const Config = require('../../config')
// eslint-disable-next-line no-unused-vars
const Course = require('./course')
// eslint-disable-next-line no-unused-vars
const Rule = require('./rule')
// eslint-disable-next-line no-unused-vars
const Student = require('./student')
// eslint-disable-next-line no-unused-vars
const State = require('./state')
const Pkg = require('./package.json')

const register = (server, options, next) => {
  Mongoose.Promise = Promise
  Mongoose.connect(Config.database.uri, Config.database.options, (err, db) => {
    if (err) {
      console.log(err)
    }
    console.log('Successfully connected to MongoDB:', Config.database.uri)
    server.app.db = {
      link: db.db,
      Course: db.model('Course'),
      Rule: db.model('Rule'),
      Student: db.model('Student'),
      State: db.model('State')
    }
    next()
  })
}

register.attributes = {
  pkg: Pkg
}

module.exports = register
