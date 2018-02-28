const Mongoose = require('mongoose')
const ReplyHelper = require('../helpers')

module.exports = (server) => {
  /**
   * Convert given array of referrals to valid json format.
   * @param referrals
   * @returns {{referrals: Array}}
   */
  const constructReferralsResponse = (referrals) => {
    const response = []
    referrals.forEach((referral) => {
      response.push(referral.toJSON(referral))
    })
    return ({
      referrals: response
    })
  }

  /**
   * Student doesn't exist, so create both student and referral
   * @param {*} request
   * @param {*} reply
   */
  const createStudentReferral = (request, reply) => {
    server.methods.services.studentreferrals.createStudentReferral(
      request.payload.referral,
      (err, referral) => {
        if (err) {
          return reply(ReplyHelper.constructErrorResponse(err)).code(422)
        }
        return reply({
          referral: referral.toHash(referral)
        }).code(201)
      }
    )
  }

  /**
   * Student already exists, so just create referral
   * @param {*} request
   * @param {*} reply
   */
  const createReferral = (request, reply) => {
    const student = request.pre.student
    request.payload.referral.students = [student._id]
    delete request.payload.studentFirstName
    delete request.payload.studentLastName
    delete request.payload.studentEmail
    server.methods.services.studentreferrals.createReferral(
      request.payload.referral,
      (err, referral) => {
        if (err) {
          return reply(ReplyHelper.constructErrorResponse(err)).code(422)
        }
        return reply({
          referral: referral.toHash(referral)
        }).code(201)
      }
    )
  }

  /**
   * StudentReferral already exists (duplicate request), so just return hash of the referral
   * @param {*} request
   * @param {*} reply
   */
  const referralHash = (request, reply) => {
    const referral = request.pre.referral
    return reply({
      referral: referral[0].toHash(referral[0])
    }).code(200)
  }

  return {
    /**
     * GET /api/referrals/{id}
     * @param request
     * @param reply
     */
    getReferralById (request, reply) {
      if (!Mongoose.Types.ObjectId.isValid(request.params.id)) {
        return reply({
          errors: {
            400: [`Invalid referral id '${request.params.id}'`]
          }
        }).code(400).takeover()
      }

      server.methods.services.studentreferrals.findReferralById(
        request.params.id,
        (err, referral) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!referral) {
            return reply({
              errors: {
                404: [`Referral not found with id '${request.params.id}'`]
              }
            }).code(404)
          }
          return reply({
            referral: referral.toJSON(referral)
          })
        }
      )
    },
    /**
     * GET /api/referrals/by-student?email={email}&year={asepYear}
     * @param request
     * @param reply
     */
    getReferralByStudentEmailAndYear (request, reply) {
      server.methods.services.studentreferrals.findReferralByStudentEmailAndYear(
        request.pre.student,
        request.query.year,
        (err, referral) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!referral) {
            return reply({
              errors: {
                404: [`Referral not found for student with email '${request.query.email}'`]
              }
            }).code(404)
          }
          return reply({
            referral: referral.toJSON(referral)
          })
        }
      )
    },
    /**
     * GET /api/referrals/by-year?year={asepYear}
     * @param request
     * @param reply
     */
    getReferralsByYear (request, reply) {
      server.methods.services.studentreferrals.findReferralsByYear(
        request.query.year,
        (err, referrals) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructReferralsResponse(referrals))
        }
      )
    },
    /**
     * GET /api/referrals/by-member-email?memberEmail={email}&year={asepYear}
     * @param request
     * @param reply
     */
    getReferralsByMemberEmailAndYear (request, reply) {
      server.methods.services.studentreferrals.findReferralsByMemberEmailAndYear(
        request.query.memberEmail,
        request.query.year,
        (err, referrals) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructReferralsResponse(referrals))
        }
      )
    },
    /**
     * GET /api/referrals/by-member?memberFirstName={firstName}&memberLastName={lastName}&year={asepYear}
     * @param request
     * @param reply
     */
    getReferralsByMemberAndYear (request, reply) {
      server.methods.services.studentreferrals.findReferralsByMemberAndYear(
        request.query.memberFirstName,
        request.query.memberLastName,
        request.query.year,
        (err, referrals) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructReferralsResponse(referrals))
        }
      )
    },
    /**
     * POST /api/referrals
     * Global method, calls one of child method based on existence of student
     * @param {*} request
     * @param {*} reply
     */
    create (request, reply) {
      const student = request.pre.student
      const referral = request.pre.referral
      if (referral && student) {
        return referralHash(request, reply)
      } else if (student) {
        return createReferral(request, reply)
      } else {
        return createStudentReferral(request, reply)
      }
    },
    /**
     * GET /api/referrals/verify/{hash}
     * @param request
     * @param reply
     */
    verify (request, reply) {
      const hash = request.params.hash
      server.methods.services.studentreferrals.findReferralByStudentEmailAndYear(
        request.pre.student,
        request.query.year,
        (err, referral) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!referral) {
            return reply({
              errors: {
                404: [`Referral not found for student with email '${request.query.email}'`]
              }
            }).code(404)
          }
          return reply({
            valid: referral.validateHash(hash, referral)
          })
        }
      )
    }
  }
}
