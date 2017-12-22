const Mongoose = require('mongoose')

const Rule = Mongoose.model('Rule')

const getRule = (id, callback) => {
  Rule.findOne({ _id: id })
    .exec()
    .then((rule) => callback(null, rule))
    .catch((err) => callback(err, null))
}

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
  Rule.find({ course: course, academicYear: academicYear, enabled: true })
    .sort({ order: 1 })
    .exec()
    .then((rules) => callback(null, rules))
    .catch((err) => callback(err, null))
}

const createRule = (payload, callback) => {
  const rule = new Rule(Object.assign(payload))
  rule.save((err, savedRule) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, savedRule)
  })
}

const updateRule = (rule, payload, callback) => {
  let ruleToBeUpdated = new Rule(rule)
  ruleToBeUpdated = Object.assign(ruleToBeUpdated, payload)
  ruleToBeUpdated.save((err, updatedRule) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, updatedRule)
  })
}

const deleteRule = (rule, callback) => {
  const ruleToBeDeleted = new Rule(Object.assign(rule))
  ruleToBeDeleted.remove((err, removedRule) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, removedRule)
  })
}

module.exports = [
  {
    name: 'services.rules.findRule',
    method: getRule
  },
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
  },
  {
    name: 'services.rules.create',
    method: createRule
  },
  {
    name: 'services.rules.update',
    method: updateRule
  },
  {
    name: 'services.rules.delete',
    method: deleteRule
  }
]
