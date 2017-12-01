import Handlers from './handlers'

module.exports = (server) => {
  const handlers = Handlers(server)
  return [
    {
      method: 'GET',
      path: '/user',
      config: {
        description: 'Get users',
        notes: 'Say Hello world',
        tags: ['api', 'user'],
        handler: handlers.sayHello
      }
    }
  ]
}
