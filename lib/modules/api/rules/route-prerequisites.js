const Mongoose = require('mongoose')
const ReplyHelper = require('../helpers')

const fetchRule = (server) => {
  return {
    method: (request, reply) => {
      if (!request.params.id) {
        return reply.continue()
      }

      if (!Mongoose.Types.ObjectId.isValid(request.params.id)) {
        return reply({
          errors: {
            400: ['Invalid rule id']
          }
        }).code(400).takeover()
      }

      server.methods.services.rules.findRule(
        request.params.id,
        (err, rule) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).takeover()
          }

          if (!rule) {
            return reply({
              errors: {
                404: ['Rule not found']
              }
            }).code(404).takeover()
          }

          return reply(rule)
        }
      )
    },
    assign: 'rule'
  }
}

module.exports = {
  fetchRule
}
