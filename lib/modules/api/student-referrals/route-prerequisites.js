const ReplyHelper = require('../helpers')

const fetchReferral = (server) => {
  return {
    method: (request, reply) => {
      if (!request.payload.referral.memberEmail) {
        return reply.continue()
      }

      server.methods.services.studentreferrals.findReferralsByMemberEmailAndYear(
        request.payload.referral.memberEmail,
        request.payload.referral.asepYear,
        (err, referral) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).takeover()
          }

          if (!referral) {
            return reply({
              errors: {
                404: ['Student referral not found']
              }
            }).code(404).takeover()
          }

          return reply(referral)
        }
      )
    },
    assign: 'referral'
  }
}

module.exports = {
  fetchReferral
}
