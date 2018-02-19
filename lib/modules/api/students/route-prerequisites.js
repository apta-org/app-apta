const Mongoose = require('mongoose')
const ReplyHelper = require('../helpers')

const fetchStudent = (server) => {
  return {
    method: (request, reply) => {
      if (!request.params.id) {
        return reply.continue()
      }

      if (!Mongoose.Types.ObjectId.isValid(request.params.id)) {
        return reply({
          errors: {
            400: ['Invalid student id']
          }
        }).code(400).takeover()
      }

      server.methods.services.students.findById(
        request.params.id,
        (err, student) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).takeover()
          }

          if (!student) {
            return reply({
              errors: {
                404: ['Student not found']
              }
            }).code(404).takeover()
          }

          return reply(student)
        }
      )
    },
    assign: 'student'
  }
}

const fetchStudentByEmail = (server) => {
  return {
    method: (request, reply) => {
      if (!request.payload.referral.studentEmail) {
        return reply.continue()
      }

      server.methods.services.students.findByEmail(
        request.payload.referral.studentEmail,
        (err, student) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).takeover()
          }

          if (!student) {
            return reply({
              errors: {
                404: ['Student not found']
              }
            }).code(404).takeover()
          }

          return reply(student)
        }
      )
    },
    assign: 'student'
  }
}

const fetchStudentByQueryParamEmail = (server) => {
  return {
    method: (request, reply) => {
      if (!request.query.email) {
        return reply.continue()
      }

      server.methods.services.students.findByEmail(
        request.query.email,
        (err, student) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).takeover()
          }

          if (!student) {
            return reply({
              errors: {
                404: ['Student not found']
              }
            }).code(404).takeover()
          }

          return reply(student)
        }
      )
    },
    assign: 'student'
  }
}

module.exports = {
  fetchStudent,
  fetchStudentByEmail,
  fetchStudentByQueryParamEmail
}
