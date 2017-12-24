const Handlers = require('./handlers')
const InputValidations = require('./validations/input')
const OutputValidations = require('./validations/output')
const Prerequisites = require('./route-prerequisites')

module.exports = (server) => {
  const handlers = Handlers(server)
  const fetchCourse = Prerequisites.fetchCourse(server)
  return [
    // GET /api/courses
    {
      method: 'GET',
      path: '/courses',
      config: {
        description: 'Get list of courses',
        notes: 'Return list of courses',
        tags: ['api', 'courses']
      },
      handler: handlers.getCourses
    },
    // GET /api/courses/{courseName}
    {
      method: 'GET',
      path: '/courses/{courseName}',
      config: {
        description: 'Get course by name',
        notes: 'Return course',
        tags: ['api', 'courses'],
        validate: InputValidations.CourseByNamePayloadValidations
      },
      handler: handlers.getCourseByName
    },
    // PUT /api/courses
    {
      method: 'PUT',
      path: '/courses',
      config: {
        description: 'Create a new course',
        notes: 'Return newly created course',
        tags: ['api', 'courses'],
        response: OutputValidations.CourseOnPutOutputValidationsConfig,
        validate: InputValidations.CourseCreatePayloadValidations
      },
      handler: handlers.createCourse
    },
    // DELETE /api/courses/{id}
    {
      method: 'DELETE',
      path: '/courses/{id}',
      config: {
        description: 'Delete a course',
        tags: ['api', 'courses'],
        pre: [
          fetchCourse
        ],
        response: OutputValidations.CourseOnDeleteOutputValidationsConfig,
        validate: InputValidations.CourseDeletePayloadValidations
      },
      handler: handlers.deleteCourse
    },
    // POST /api/courses/{id}
    {
      method: 'POST',
      path: '/courses/{id}',
      config: {
        description: 'Update a course',
        tags: ['api', 'courses'],
        pre: [
          fetchCourse
        ],
        response: OutputValidations.CourseOnPostOutputValidationsConfig,
        validate: InputValidations.CourseUpdatePayloadValidations
      },
      handler: handlers.updateCourse
    }
  ]
}
