module.exports = (server) => {
  return {
    /**
     * GET /api/user
     * @param request
     * @param reply
     */
    sayHello (request, reply) {
      console.log(server, request)
      return reply({ message: 'Hello world' })
    }
  }
}
