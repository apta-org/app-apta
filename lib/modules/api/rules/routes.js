const Handlers = require('./handlers')
const InputValidations = require('./validations/input')
const Prerequisites = require('../courses/route-prerequisites')

module.exports = (server) => {
  const handlers = Handlers(server)
  const fetchCourse = Prerequisites.fetchCourse(server)

  return [
    // GET api/rules
    {
      method: 'GET',
      path: '/rules',
      config: {
        description: 'Get list of rules',
        notes: 'Return list of rules',
        tags: ['api', 'rules']
      },
      handler: handlers.getRules
    },
    // GET api/rules/{courseName}
    {
      method: 'GET',
      path: '/rules/{courseName}',
      config: {
        description: 'Get list of rules for given course',
        notes: 'Return list of rules for given course',
        tags: ['api', 'rules'],
        validate: InputValidations.RulesByCourseNameValidations
      },
      handler: handlers.getRulesByCourse
    },
    // GET /api/rules/{id}/{academicYear}
    {
      method: 'GET',
      path: '/rules/{id}/{academicYear}',
      config: {
        description: 'Get rules by course and academic year',
        notes: 'Return list of all rules for the give course and academic year',
        tags: ['api', 'rules'],
        pre: [
          fetchCourse
        ],
        validate: InputValidations.RulesByCourseAndAcademicYearValidations
      },
      handler: handlers.getRulesByCourseAndAcademicYear
    }
  ]
}
