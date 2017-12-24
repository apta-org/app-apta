const ReplyHelper = require('../helpers')

module.exports = (server) => {
  const constructRulesResponse = (rules, includeAllProperties) => {
    const response = []
    rules.forEach((rule) => {
      response.push(rule.toJSONFor(rule, includeAllProperties))
    })
    return ({
      rules: response
    })
  }

  return {
    /**
     * GET /api/rules
     * @param {*} request
     * @param {*} reply
     */
    // eslint-disable-next-line no-unused-vars
    getRules (request, reply) {
      server.methods.services.rules.findRules(
        (err, rules) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructRulesResponse(rules, true))
        }
      )
    },
    /**
     * GET /api/rules/{courseName}
     * @param request
     * @param reply
     */
    getRulesByCourse (request, reply) {
      server.methods.services.rules.findRulesByCourse(
        request.params.courseName,
        (err, rules) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructRulesResponse(rules, true))
        }
      )
    },
    /**
     * GET /api/rules/{id}/{academicYear}
     * @param request
     * @param reply
     */
    getRulesByCourseAndAcademicYear (request, reply) {
      const course = request.pre.course
      server.methods.services.rules.findRulesByCourseAndAcademicYear(
        course,
        request.params.academicYear,
        (err, rules) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructRulesResponse(rules, false))
        }
      )
    },
    /**
     * PUT /api/rules/{id}
     * @param request
     * @param reply
     */
    createRule (request, reply) {
      const course = request.pre.course
      request.payload.rule.course = course._id
      request.payload.rule.qualifiedMarks = course.minimumMarks
      server.methods.services.rules.create(
        request.payload.rule,
        (err, rule) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply({
            rule: rule.toJSONFor(rule, true)
          }).code(201)
        }
      )
    },
    /**
     * POST /api/rules/{id}
     * @param request
     * @param reply
     */
    updateRule (request, reply) {
      server.methods.services.rules.update(
        request.pre.rule,
        request.payload.rule,
        (err, rule) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          const jsonRule = rule.toJSONFor(rule, true)
          delete jsonRule.id
          delete jsonRule.course
          return reply({
            rule: jsonRule
          })
        }
      )
    },
    /**
     * DELETE /api/rules/{id}
     * @param request
     * @param reply
     */
    deleteRule (request, reply) {
      server.methods.services.rules.delete(
        request.pre.rule,
        // eslint-disable-next-line no-unused-vars
        (err, rule) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply().code(204)
        }
      )
    }
  }
}
