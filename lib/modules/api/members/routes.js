const Handlers = require('./handlers')
const InputValidations = require('./validations/input')

module.exports = (server) => {
  const handlers = Handlers(server)
  return [
    // GET /api/member
    {
      method: 'GET',
      path: '/member',
      config: {
        description: 'Get member by phone or email or firstName or lastName',
        notes: 'Return member',
        tags: ['api', 'member'],
        validate: InputValidations.MemberQueryValidations
      },
      handler: handlers.getMember
    }
  ]
}
