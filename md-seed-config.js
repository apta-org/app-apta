import mongooseLib from 'mongoose'
import Promise from 'bluebird'
import config from './lib/config'
import CourseSeeder from './lib/resources/seeders/course.seeders'

mongooseLib.Promise = Promise

export const mongoose = mongooseLib
export const mongoURL = config.database.uri
console.log('Mongo DB URL:', mongoURL)

/**
 * Provide list of seeders here.
 * IMPORTANT: Order is very critical.
 *
 * @type {{Courses: CourseSeeder}}
 */
export const seedersList = {
  CourseSeeder
}
