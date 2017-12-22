const Handlers = require('./handlers')
const InputValidations = require('./validations/input')
const OutputValidations = require('./validations/output')
const CoursePrerequisites = require('../courses/route-prerequisites')
const RulePrerequisites = require('./route-prerequisites')

module.exports = (server) => {
  const handlers = Handlers(server)
  const fetchCourse = CoursePrerequisites.fetchCourse(server)
  const fetchRule = RulePrerequisites.fetchRule(server)

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
    },
    // PUT /api/rules/{id}
    {
      method: 'PUT',
      path: '/rules/{id}',
      config: {
        description: 'Create a new rule',
        notes: 'Return newly created rule',
        tags: ['api', 'rules'],
        pre: [
          fetchCourse
        ],
        response: OutputValidations.RuleOnPutOutputValidationsConfig,
        validate: InputValidations.RuleCreatePayloadValidations
      },
      handler: handlers.createRule
    },
    // POST /api/rules/{id}
    {
      method: 'POST',
      path: '/rules/{id}',
      config: {
        description: 'Update a rule',
        notes: 'Return updated rule',
        tags: ['api', 'rules'],
        pre: [
          fetchRule
        ],
        response: OutputValidations.RuleOnPostOutputValidationsConfig,
        validate: InputValidations.RuleUpdatePayloadValidations
      },
      handler: handlers.updateRule
    },
    // DELETE /api/rules/{id}
    {
      method: 'DELETE',
      path: '/rules/{id}',
      config: {
        description: 'Delete a rule',
        tags: ['api', 'rules'],
        pre: [
          fetchRule
        ],
        response: OutputValidations.RuleOnDeleteOutputValidationsConfig,
        validate: InputValidations.RuleDeletePayloadValidations
      },
      handler: handlers.deleteRule
    }
  ]
}
