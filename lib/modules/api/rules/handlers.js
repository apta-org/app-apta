const ReplyHelper = require('../helpers')

module.exports = (server) => {
  const rulesResponse = (rules) => {
    const response = []
    rules.forEach((rule) => {
      response.push(rule.toJSONWithoutCourse(rule))
    })
    return({
      rules: response
    })
  }

  const constructRulesResponse = (course, rules) => {
    const response = []
    rules.forEach((rule) => {
      response.push(rule.toJSON(course, rule))
    })
    return({
      rules: response
    })
  }

  return {
    /**
     * GET /api/rules
     * @param {*} request
     * @param {*} reply
     */
    getRules (request, reply) {
      console.log('getRules Query:', request.query)
      server.methods.services.rules.findRules(
        (err, rules) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(rulesResponse(rules))
        }
      )
    },
    /**
     * GET /api/rules/{courseName}
     * @param request
     * @param reply
     */
    getRulesByCourse(request, reply) {
      server.methods.services.rules.findRulesByCourse(
        request.params.courseName,
        (err, rules) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(rulesResponse(rules))
        }
      )
    },
    /**
     * GET /api/rules/{id}/{academicYear}
     * @param request
     * @param reply
     */
    getRulesByCourseAndAcademicYear (request, reply) {
      console.log('course id:', request.pre.course, ', year:', request.params.academicYear)
      const course = request.pre.course
      server.methods.services.rules.findRulesByCourseAndAcademicYear(
        course,
        request.params.academicYear,
        (err, rules) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructRulesResponse(course, rules))
        }
      )
    }
  }
}
