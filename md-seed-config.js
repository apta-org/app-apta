const MongooseLib = require('mongoose')
const Promise = require('bluebird')
const Config = require('./lib/config')
const CourseSeeder = require('./lib/resources/seeders/course.seeders')
const RuleSeeder = require('./lib/resources/seeders/rule.seeders.js')
const StateSeeder = require('./lib/resources/seeders/state.seeders')

MongooseLib.Promise = Promise

const mongoConfig = {
  mongoose: MongooseLib,
  mongoURL: Config.database.uri,
  /**
   * Provide list of seeders here.
   * IMPORTANT: Order is very critical.
   *
   * @type {{Courses: CourseSeeder}}
   * @type {{Rules: RuleSeeder}}
   * @type {{States: StateSeeder}}
   */
  seedersList: {
    CourseSeeder,
    RuleSeeder,
    StateSeeder
  }
}

console.log('Mongo DB URL:', mongoConfig.mongoURL)

module.exports = mongoConfig
