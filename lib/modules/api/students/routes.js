const Handlers = require('./handlers')
const InputValidations = require('./validations/input')
const OutputValidations = require('./validations/output')
const Prerequisites = require('./route-prerequisites')

module.exports = (server) => {
  const handlers = Handlers(server)
  const fetchStudent = Prerequisites.fetchStudent(server)
  return [
    // GET /api/students/{id}
    {
      method: 'GET',
      path: '/students/{id}',
      config: {
        description: 'Get student by id',
        notes: 'Return student',
        tags: ['api', 'students'],
        validate: InputValidations.StudentByIdPayloadValidations
      },
      handler: handlers.getStudentById
    },
    // GET /api/students/by-email?email={email}
    {
      method: 'GET',
      path: '/students/by-email',
      config: {
        description: 'Get student by email',
        notes: 'Return student',
        tags: ['api', 'students'],
        validate: InputValidations.StudentByEmailQueryValidations
      },
      handler: handlers.getStudentByEmail
    },
    // GET /api/students/by-name?firstName={firstName}&lastName={lastName}
    {
      method: 'GET',
      path: '/students/by-name',
      config: {
        description: 'Get student by first and last name',
        notes: 'Return student',
        tags: ['api', 'students'],
        validate: InputValidations.StudentByNameQueryValidations
      },
      handler: handlers.getStudentByName
    },
    // GET /api/students/by-first-name?firstName={firstName}
    {
      method: 'GET',
      path: '/students/by-first-name',
      config: {
        description: 'Get students by matching first name',
        notes: 'Return matching students',
        tags: ['api', 'students'],
        validate: InputValidations.StudentsByFirstNameQueryValidations
      },
      handler: handlers.getStudentsByFirstName
    },
    // GET /api/students/by-last-name?lastName={lastName}
    {
      method: 'GET',
      path: '/students/by-last-name',
      config: {
        description: 'Get students by matching last name',
        notes: 'Return matching students',
        tags: ['api', 'students'],
        validate: InputValidations.StudentsByLastNameQueryValidations
      },
      handler: handlers.getStudentsByLastName
    },
    // GET /api/students/by-phone?phone={phone}
    {
      method: 'GET',
      path: '/students/by-phone',
      config: {
        description: 'Get students by matching phone number',
        notes: 'Return matching students',
        tags: ['api', 'students'],
        validate: InputValidations.StudentsByPhoneNumberQueryValidations
      },
      handler: handlers.getStudentsByPhone
    },
    // GET /api/students/by-location?state={stateCode}
    // GET /api/students/by-location?city={cityName}
    // GET /api/students/by-location?district={districtName}
    // GET /api/students/by-location?pinCode={pinCode}
    // GET /api/students/by-location?city={cityName}&state={stateCode}
    // GET /api/students/by-location?city={cityName}&district={districtName}
    // GET /api/students/by-location?district={districtName}&&state={stateCode}
    // GET /api/students/by-location?city={cityName}&district={districtName}&&state={stateCode}
    {
      method: 'GET',
      path: '/students/by-location',
      config: {
        description: 'Get students by matching location',
        notes: 'Return matching students',
        tags: ['api', 'students'],
        validate: InputValidations.StudentsByLocationQueryValidations
      },
      handler: handlers.getStudentsByLocation
    },
    // POST /api/students
    {
      method: 'POST',
      path: '/students',
      config: {
        description: 'Create a new student',
        notes: 'Return newly created student',
        tags: ['api', 'students'],
        response: OutputValidations.StudentOnPostOutputValidationsConfig,
        validate: InputValidations.StudentCreatePayloadValidations
      },
      handler: handlers.createStudent
    },
    // PUT /api/students/{id}
    {
      method: 'PUT',
      path: '/students/{id}',
      config: {
        description: 'Update a student',
        tags: ['api', 'students'],
        pre: [
          fetchStudent
        ],
        response: OutputValidations.StudentOnPutOutputValidationsConfig,
        validate: InputValidations.StudentUpdatePayloadValidations
      },
      handler: handlers.updateStudent
    }
  ]
}
