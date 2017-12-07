import replyHelper from '../helpers'

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

  return {
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
          return reply(replyHelper.constructErrorResponse(err)).code(422)
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
      console.log('Create course payload:', request.payload.course)
      server.methods.services.courses.create(
        request.payload.course,
        (err, course) => {
          if (err) {
            return reply(replyHelper.constructErrorResponse(err)).code(422)
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
            return reply(replyHelper.constructErrorResponse(err)).code(422)
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
            return reply(replyHelper.constructErrorResponse(err)).code(422)
          }
          return reply({
            course: updatedCourse.toJSON(updatedCourse)
          })
        }
      )
    }
  }
}
