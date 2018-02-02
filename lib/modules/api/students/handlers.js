const Mongoose = require('mongoose')
const ReplyHelper = require('../helpers')

module.exports = (server) => {
  /**
   * Convert given array of students to valid json format.
   * @param students
   * @returns {{students: Array}}
   */
  const constructStudentsResponse = (students) => {
    const response = []
    students.forEach((student) => {
      response.push(student.toJSON(student))
    })
    return ({
      students: response
    })
  }

  /**
   * Before sending updated student, remove unnecessary 'id' from the response.
   * @param updatedStudent
   * @returns {{student}}
   */
  const constructUpdatedStudentResponse = (updatedStudent) => {
    const jsonStudent = updatedStudent.toJSON(updatedStudent)
    delete jsonStudent.id
    return ({
      student: jsonStudent
    })
  }

  return {
    /**
     * GET /api/students/{id}
     * @param request
     * @param reply
     */
    getStudentById (request, reply) {
      if (!Mongoose.Types.ObjectId.isValid(request.params.id)) {
        return reply({
          errors: {
            400: [`Invalid student id '${request.params.id}'`]
          }
        }).code(400).takeover()
      }

      server.methods.services.students.findById(
        request.params.id,
        (err, student) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!student) {
            return reply({
              errors: {
                404: [`Student not found with id '${request.params.id}'`]
              }
            }).code(404)
          }
          return reply({
            student: student.toJSON(student)
          })
        }
      )
    },
    /**
     * GET /api/students/by-email?email={email}
     * @param request
     * @param reply
     */
    getStudentByEmail (request, reply) {
      server.methods.services.students.findByEmail(
        request.query.email,
        (err, student) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!student) {
            return reply({
              errors: {
                404: [`Student not found with email '${request.query.email}'`]
              }
            }).code(404)
          }
          return reply({
            student: student.toJSON(student)
          })
        }
      )
    },
    /**
     * GET /api/students/by-name?firstName={firstName}&lastName={lastName}
     * @param request
     * @param reply
     */
    getStudentByName (request, reply) {
      server.methods.services.students.findByName(
        request.query.firstName,
        request.query.lastName,
        (err, student) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!student) {
            return reply({
              errors: {
                404: [`Student not found with name '${request.query.firstName} ${request.query.lastName}'`]
              }
            }).code(404)
          }
          return reply({
            student: student.toJSON(student)
          })
        }
      )
    },
    /**
     * GET /api/students/by-first-name?firstName={firstName}
     * @param request
     * @param reply
     */
    getStudentsByFirstName (request, reply) {
      server.methods.services.students.findByFirstName(
        request.query.firstName,
        (err, students) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!students) {
            return reply({
              errors: {
                404: [`Students not found with first name '${request.query.firstName}'`]
              }
            }).code(404)
          }
          return reply(constructStudentsResponse(students))
        }
      )
    },
    /**
     * GET /api/students/by-last-name?lastName={lastName}
     * @param request
     * @param reply
     */
    getStudentsByLastName (request, reply) {
      server.methods.services.students.findByLastName(
        request.query.lastName,
        (err, students) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!students) {
            return reply({
              errors: {
                404: [`Students not found with last name '${request.query.lastName}'`]
              }
            }).code(404)
          }
          return reply(constructStudentsResponse(students))
        }
      )
    },
    /**
     * GET /api/students/by-phone?phone={phone}
     * @param request
     * @param reply
     */
    getStudentsByPhone (request, reply) {
      server.methods.services.students.findByPhone(
        request.query.phone,
        (err, students) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!students) {
            return reply({
              errors: {
                404: [`Students not found with phone '${request.query.phone}'`]
              }
            }).code(404)
          }
          return reply(constructStudentsResponse(students))
        }
      )
    },
    /**
     * GET /api/students/by-location?state={stateCode}
     * GET /api/students/by-location?city={cityName}
     * GET /api/students/by-location?district={districtName}
     * GET /api/students/by-location?pinCode={pinCode}
     * GET /api/students/by-location?city={cityName}&state={stateCode}
     * GET /api/students/by-location?city={cityName}&district={districtName}
     * GET /api/students/by-location?district={districtName}&&state={stateCode}
     * GET /api/students/by-location?city={cityName}&district={districtName}&&state={stateCode}
     * @param request
     * @param reply
     */
    getStudentsByLocation (request, reply) {
      server.methods.services.students.findByLocation(
        request.query,
        (err, students) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!students) {
            return reply({
              errors: {
                404: ['Students not found at this location']
              }
            }).code(404)
          }
          return reply(constructStudentsResponse(students))
        }
      )
    },
    /**
     * POST /api/students
     * @param {*} request
     * @param {*} reply
     */
    createStudent (request, reply) {
      server.methods.services.students.create(
        request.payload.student,
        (err, student) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply({
            student: student.toJSON(student)
          }).code(201)
        })
    },
    /**
     * PUT /api/students/{id}
     * @param request
     * @param reply
     */
    updateStudent (request, reply) {
      server.methods.services.students.update(
        request.pre.student,
        request.payload.student,
        (err, updatedStudent) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructUpdatedStudentResponse(updatedStudent))
        }
      )
    }
  }
}
