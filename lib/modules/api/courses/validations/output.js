const Joi = require('joi')
const _ = require('lodash')
const {
  ErrorsOnPutOutputValidations,
  ErrorsOnDeleteOutputValidations,
  ErrorsOnPostOutputValidations
} = require('../../validations')

// --------------------------------------------------
//    Schema - Output Validations
// --------------------------------------------------
const CourseJSON = Joi.object().keys({
  name: Joi.string().required().description('The course name'),
  description: Joi.string().required().description('The course description'),
  length: Joi.number().required().description('The course length'),
  rank: Joi.number().required().description('The course rank to maintain sorting')
})

const SingleCourseOutputPayload = Joi.object().keys({
  course: CourseJSON
})

const ErrorOutputValidation = Joi.object().keys({
  errors: Joi.object().keys({
    name: Joi.array().items(Joi.string()).optional(),
    description: Joi.array().items(Joi.string()).optional(),
    length: Joi.array().items(Joi.string()).optional(),
    rank: Joi.array().items(Joi.string()).optional()
  })
})

const CourseOnPutOutputValidationsConfig = _.merge({}, ErrorsOnPutOutputValidations, {
  status: {
    200: SingleCourseOutputPayload,
    422: ErrorOutputValidation
  }
})

const CourseOnDeleteOutputValidationsConfig = _.merge({}, ErrorsOnDeleteOutputValidations, {
  status: {
    204: false
  }
})

const CourseOnPostOutputValidationsConfig = _.merge({}, ErrorsOnPostOutputValidations, {
  status: {
    200: SingleCourseOutputPayload,
    422: ErrorOutputValidation
  }
})

module.exports = {
  CourseOnPutOutputValidationsConfig,
  CourseOnDeleteOutputValidationsConfig,
  CourseOnPostOutputValidationsConfig
}
