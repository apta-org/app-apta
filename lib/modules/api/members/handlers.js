const ReplyHelper = require('../helpers')

module.exports = (server) => {
  return {
    /**
     * GET /api/member
     * @param request
     * @param reply
     */
    getMember (request, reply) {
      server.methods.services.members.findMember(
        request.query,
        (err, members) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!members) {
            return reply({
              errors: {
                404: ['Failed to find member']
              }
            }).code(404)
          }
          return reply({
            members: members
          })
        }
      )
    }
  }
}
