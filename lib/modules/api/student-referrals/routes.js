const Handlers = require('./handlers')
const InputValidations = require('./validations/input')
const Prerequisites = require('../students/route-prerequisites')
const ReferralPrerequisites = require('./route-prerequisites')

module.exports = (server) => {
  const handlers = Handlers(server)
  const fetchReferral = ReferralPrerequisites.fetchReferral(server)
  const fetchStudentByEmail = Prerequisites.fetchStudentByEmail(server)
  const fetchStudentByQueryParamEmail = Prerequisites.fetchStudentByQueryParamEmail(server)

  return [
    // GET /api/referrals/{id}
    {
      method: 'GET',
      path: '/referrals/{id}',
      config: {
        description: 'Get referral by id',
        notes: 'Return student referral',
        tags: ['api', 'referrals'],
        validate: InputValidations.ReferralByIdPayloadValidations
      },
      handler: handlers.getReferralById
    },
    // GET /api/referrals/by-student?email={email}&year={asepYear}
    {
      method: 'GET',
      path: '/referrals/by-student',
      config: {
        description: 'Get referral by student email and ASEP year',
        notes: 'Return referral',
        tags: ['api', 'referrals'],
        pre: [
          fetchStudentByQueryParamEmail
        ],
        validate: InputValidations.ReferralByStudentEmailQueryValidations
      },
      handler: handlers.getReferralByStudentEmailAndYear
    },
    // GET /api/referrals/by-year?year={asepYear}
    {
      method: 'GET',
      path: '/referrals/by-year',
      config: {
        description: 'Get referral list by ASEP year',
        notes: 'Return referral list',
        tags: ['api', 'referrals'],
        validate: InputValidations.ReferralListByYearQueryValidations
      },
      handler: handlers.getReferralsByYear
    },
    // GET /api/referrals/by-member-email?memberEmail={email}&year={asepYear}
    {
      method: 'GET',
      path: '/referrals/by-member-email',
      config: {
        description: 'Get referral list by member email and ASEP year',
        notes: 'Return referral list',
        tags: ['api', 'referrals'],
        validate: InputValidations.ReferralListByMemberEmailQueryValidations
      },
      handler: handlers.getReferralsByMemberEmailAndYear
    },
    // GET /api/referrals/by-member?memberFirstName={firstName}&memberLastName={lastName}&year={asepYear}
    {
      method: 'GET',
      path: '/referrals/by-member',
      config: {
        description: 'Get referral list by member full name and ASEP year',
        notes: 'Return referral list',
        tags: ['api', 'referrals'],
        validate: InputValidations.ReferralListByMemberQueryValidations
      },
      handler: handlers.getReferralsByMemberAndYear
    },
    // POST /api/referrals
    {
      method: 'POST',
      path: '/referrals',
      config: {
        description: 'Create a new student referral',
        notes: 'Return newly created referral identification',
        tags: ['api', 'referrals'],
        pre: [
          fetchReferral,
          fetchStudentByEmail
        ],
        validate: InputValidations.ReferralCreatePayloadValidations
      },
      handler: handlers.create
    },
    // GET /api/referrals/verify/{hash}
    {
      method: 'GET',
      path: '/referrals/verify/{hash}',
      config: {
        description: 'Verify student referral by hash',
        notes: 'Return student referral validity',
        tags: ['api', 'referrals'],
        pre: [
          fetchStudentByQueryParamEmail
        ],
        validate: InputValidations.ReferralValidateByHashValidations
      },
      handler: handlers.verify
    }
  ]
}
