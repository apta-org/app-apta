const Handlers = require('./handlers')

module.exports = (server) => {
  const handlers = Handlers(server)
  return [
    // GET /api/states
    {
      method: 'GET',
      path: '/states',
      config: {
        description: 'Get list of states along with associated districts',
        notes: 'Return list of states',
        tags: ['api', 'states']
      },
      handler: handlers.getStates
    }
  ]
}
