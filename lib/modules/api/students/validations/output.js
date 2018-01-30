const Joi = require('joi')
const _ = require('lodash')
const {
  ErrorsOnRequestPutOutputValidations,
  ErrorsOnRequestPostOutputValidations
} = require('../../validations')

// --------------------------------------------------
//    Schema - Output Validations
// --------------------------------------------------
const StudentJSON = Joi.object().keys({
  firstName: Joi.string().required().description('The firstName of the student'),
  lastName: Joi.string().required().description('The lastName of the student'),
  email: Joi.string().required().description('The email id of the student'),
  dateOfBirth: Joi.string().description('The dateOfBirth of the student'),
  placeOfBirth: Joi.string().description('The placeOfBirth of the student'),
  phonePrimary: Joi.string().description('The phonePrimary of the student'),
  phoneSecondary: Joi.string().description('The phoneSecondary of the student'),
  addressLane1: Joi.string().description('The addressLane1 of the student'),
  addressLane2: Joi.string().description('The addressLane2 of the student'),
  city: Joi.string().description('The city of the student'),
  district: Joi.string().description('The district of the student'),
  state: Joi.string().description('The state of the student'),
  pinCode: Joi.string().description('The pinCode of the student')
})

const SingleStudentOutputPayload = Joi.object().keys({
  student: StudentJSON
})

const ErrorOutputValidation = Joi.object().keys({
  errors: Joi.object().keys({
    firstName: Joi.array().items(Joi.string()),
    lastName: Joi.array().items(Joi.string()),
    email: Joi.array().items(Joi.string()),
    dateOfBirth: Joi.array().items(Joi.string()).optional(),
    placeOfBirth: Joi.array().items(Joi.string()).optional(),
    phonePrimary: Joi.array().items(Joi.string()).optional(),
    phoneSecondary: Joi.array().items(Joi.string()).optional(),
    addressLane1: Joi.array().items(Joi.string()).optional(),
    addressLane2: Joi.array().items(Joi.string()).optional(),
    city: Joi.array().items(Joi.string()).optional(),
    district: Joi.array().items(Joi.string()).optional(),
    state: Joi.array().items(Joi.string()).optional(),
    pinCode: Joi.array().items(Joi.string()).optional()
  })
})

const StudentOnPostOutputValidationsConfig = _.merge({}, ErrorsOnRequestPostOutputValidations, {
  status: {
    200: SingleStudentOutputPayload,
    422: ErrorOutputValidation
  }
})

const StudentOnPutOutputValidationsConfig = _.merge({}, ErrorsOnRequestPutOutputValidations, {
  status: {
    200: SingleStudentOutputPayload,
    422: ErrorOutputValidation
  }
})

module.exports = {
  StudentOnPostOutputValidationsConfig,
  StudentOnPutOutputValidationsConfig
}
