const Mongoose = require('mongoose')

const Rule = Mongoose.model('Rule')

const getRules = (callback) => {
  Rule.find({})
    .sort({ course: 1, academicYear: 1, requiredCourseDescription: 1 })
    .exec()
    .then((rules) => callback(null, rules))
    .catch((err) => callback(err, null))
}

const getRulesByCourse = (courseName, callback) => {
  Rule.find({ name: courseName })
    .sort({ academicYear: -1, order: 1 })
    .exec()
    .then((rules) => callback(null, rules))
    .catch((err) => callback(err, null))
}

const getRulesByCourseAndAcademicYear = (course, academicYear, callback) => {
  Rule.find({ course: course, academicYear: academicYear })
    .sort({ order: 1 })
    .exec()
    .then((rules) => callback(null, rules))
    .catch((err) => callback(err, null))
}

module.exports = [
  {
    name: 'services.rules.findRules',
    method: getRules
  },
  {
    name: 'services.rules.findRulesByCourse',
    method: getRulesByCourse
  },
  {
    name: 'services.rules.findRulesByCourseAndAcademicYear',
    method: getRulesByCourseAndAcademicYear
  }
]
