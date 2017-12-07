import mongoose from 'mongoose'
import replyHelper from '../helpers'

const fetchCourse = (server) => {
  return {
    method: (request, reply) => {
      if (!request.params.id) {
        return reply.continue()
      }

      if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
        return reply({
          errors: {
            400: ['Invalid course id']
          }
        }).code(400).takeover()
      }

      server.methods.services.courses.findById(
        request.params.id,
        (err, course) => {
          if (err) {
            return reply(replyHelper.constructErrorResponse(err)).takeover()
          }

          if (!course) {
            return reply({
              errors: {
                404: ['Course not found']
              }
            }).code(404).takeover()
          }

          return reply(course)
        }
      )
    },
    assign: 'course'
  }
}

module.exports = {
  fetchCourse
}
