const Mongoose = require('mongoose')
const { Seeder } = require('mongoose-data-seed')
const Rule = require('../../modules/models/rule')
const Course = require('../../modules/models/course')

Mongoose.Promise = require('bluebird')

const finalRules = []

const rules = [
  {
    name: 'Inter',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 1
  },
  {
    name: 'Inter',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Inter 1st Year',
    order: 1
  },
  {
    name: 'Inter',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 2
  },
  {
    name: 'DA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 1
  },
  {
    name: 'DA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Diploma in Agriculture 1st Year',
    order: 1
  },
  {
    name: 'DA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 2
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 1
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Polytechnic 1st Year',
    order: 1
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 2
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Polytechnic 2nd Year',
    order: 1
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Polytechnic 1st Year',
    order: 2
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 3
  }
]

/**
 * Filter rules to find unique course from rule by course name.
 * @returns {Array.<*>}
 */
const filterRules = () => {
  let flags = {}
  let filteredRules = rules.filter((rule) => {
    if (flags[rule.name]) {
      return false
    }
    flags[rule.name] = true
    return true
  })
  return filteredRules
}

/**
 * Prepare final rule object by replacing with actual course for each rule.
 * @param course
 * @param rule
 * @returns {{course: *, academicYear: (number|*|RuleSchema.academicYear|{type, unique, required}), requiredCourseDescription: (string|string|string|string|*|string), order}}
 */
const prepareRule = (course, rule) => {
  return {
    course: course,
    academicYear: rule.academicYear,
    requiredCourseDescription: rule.requiredCourseDescription,
    order: rule.order
  }
}

/**
 * From courses promise prepare all rules.
 * @param courses
 */
const prepareFinalRules = (courses) => {
  courses.forEach((course) => {
    rules.forEach((rule) => {
      if (rule.name === course.name) {
        finalRules.push(prepareRule(course, rule))
      }
    })
  })
}

/**
 * Find unique courses for each rule.
 * @returns {Promise.<*>}
 */
const findCourses = () => {
  let courseQueries = []
  filterRules().forEach((rule) => {
    courseQueries.push(Course.findOne({ name: rule.name }).exec())
  })

  return Promise.all(courseQueries)
}

const RuleSeeder = Seeder.extend({
  beforeRun: () => {
    return findCourses()
      .then((courses) => {
        prepareFinalRules(courses)
      })
      .catch((err) => {
        throw err
      })
  },
  shouldRun: () => {
    return Rule.count().exec().then((count) => count === 0)
  },
  run: () => {
    return Rule.create(finalRules)
  }
})

module.exports = RuleSeeder
