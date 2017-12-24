const Joi = require('joi')
const { validateOptions } = require('../../validations')

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------
const CourseParamsValidations = {
  params: {
    id: Joi.string().required()
  }
}

const CourseByNameParamsValidations = {
  params: {
    courseName: Joi.string().required().description('Course Name')
  }
}

// --------------------------------------------------
//    Schema - Input Validations
// --------------------------------------------------
const CourseCreatePayload = Joi.object().keys({
  course: Joi.object().keys({
    name: Joi.string().required().description('the name of the course').example('BTech'),
    description: Joi.string().required().description('the description of the course').example('Bachelor of Technology'),
    length: Joi.number().greater(0).required().description('the length of the course').example('4'),
    rank: Joi.number().greater(0).required().description('the rank of the course to maintain sorting').example('26'),
    minimumMarks: Joi.number().greater(0).required().description('the minimumMarks required of the course').example('75'),
    allowedForProgram: Joi.boolean().required().description('the eligibility status of the course').example('true')
  })
})

const CourseUpdatePayload = Joi.object().keys({
  course: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    length: Joi.number().greater(0).required(),
    rank: Joi.number().greater(0).required(),
    minimumMarks: Joi.number().greater(0).required(),
    allowedForProgram: Joi.boolean().required()
  })
})

const CourseCreatePayloadValidations = {
  payload: CourseCreatePayload,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const CourseUpdatePayloadValidations = Object.assign({
  payload: CourseUpdatePayload,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, CourseParamsValidations)

const CourseDeletePayloadValidations = Object.assign({
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, CourseParamsValidations)

const CourseByNamePayloadValidations = Object.assign({
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, CourseByNameParamsValidations)

module.exports = {
  CourseCreatePayloadValidations,
  CourseDeletePayloadValidations,
  CourseUpdatePayloadValidations,
  CourseByNamePayloadValidations
}
