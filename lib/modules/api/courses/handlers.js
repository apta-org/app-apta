const ReplyHelper = require('../helpers')

module.exports = (server) => {
  const constructCourseResponse = (courses) => {
    const response = []
    courses.forEach((course) => {
      response.push(course.toJSON(course))
    })
    return ({
      courses: response
    })
  }

  const constructUpdatedCourseResponse = (updatedCourse) => {
    const alteredCourse = {
      name: updatedCourse.name,
      description: updatedCourse.description,
      length: updatedCourse.length,
      rank: updatedCourse.rank,
      minimumMarks: updatedCourse.minimumMarks,
      allowedForProgram: updatedCourse.allowedForProgram
    }
    return ({
      course: alteredCourse
    })
  }

  return {
    /**
     * GET /api/courses/{courseName}
     * @param {*} request
     * @param {*} reply
     */
    getCourseByName (request, reply) {
      server.methods.services.courses.findByName(
        request.params.courseName,
        (err, course) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          if (!course) {
            return reply({
              errors: {
                404: [`Course '${request.params.courseName}' not found`]
              }
            }).code(404)
          }
          return reply({
            course: course.toJSON(course)
          })
        }
      )
    },
    /**
     * GET /api/courses
     * @param {*} request
     * @param {*} reply
     */
    getCourses (request, reply) {
      const query = request.query
      console.log('Get courses Query:', query)
      server.methods.services.courses.list((err, courses) => {
        if (err) {
          return reply(ReplyHelper.constructErrorResponse(err)).code(422)
        }
        return reply(constructCourseResponse(courses))
      })
    },
    /**
     * PUT /api/courses
     * @param {*} request
     * @param {*} reply
     */
    createCourse (request, reply) {
      server.methods.services.courses.create(
        request.payload.course,
        (err, course) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply({
            course: course.toJSON(course)
          }).code(201)
        })
    },
    /**
     * DELETE /api/courses/{id}
     * @param {*} request
     * @param {*} reply
     */
    deleteCourse (request, reply) {
      server.methods.services.courses.delete(
        request.pre.course,
        // eslint-disable-next-line no-unused-vars
        (err, course) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply().code(204)
        }
      )
    },
    /**
     * POST /api/courses/{id}
     * @param request
     * @param reply
     */
    updateCourse (request, reply) {
      server.methods.services.courses.update(
        request.pre.course,
        request.payload.course,
        (err, updatedCourse) => {
          if (err) {
            return reply(ReplyHelper.constructErrorResponse(err)).code(422)
          }
          return reply(constructUpdatedCourseResponse(updatedCourse))
        }
      )
    }
  }
}
