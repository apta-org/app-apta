const MongooseLib = require('mongoose')
const Promise = require('bluebird')
const Config = require('./lib/config')
const CourseSeeder = require('./lib/resources/seeders/course.seeders')
const RuleSeeder = require('./lib/resources/seeders/rule.seeders.js')

MongooseLib.Promise = Promise

const mongoConfig = {
  mongoose: MongooseLib,
  mongoURL: Config.database.uri,
  /**
   * Provide list of seeders here.
   * IMPORTANT: Order is very critical.
   *
   * @type {{Courses: CourseSeeder}}
   */
  seedersList: {
    CourseSeeder,
    RuleSeeder
  }
}

console.log('Mongo DB URL:', mongoConfig.mongoURL)

module.exports = mongoConfig
