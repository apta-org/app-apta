const ReplyHelper = require('../helpers')

module.exports = (server) => {
  const constructStatesResponse = (states) => {
    const response = []
    states.forEach((state) => {
      response.push(state.toJSON(state))
    })
    return ({
      states: response
    })
  }

  return {
    /**
     * GET /api/states
     * @param {*} request
     * @param {*} reply
     */
    // eslint-disable-next-line no-unused-vars
    getStates (request, reply) {
      server.methods.services.states.list((err, states) => {
        if (err) {
          return reply(ReplyHelper.constructErrorResponse(err)).code(422)
        }
        return reply(constructStatesResponse(states))
      })
    }
  }
}
