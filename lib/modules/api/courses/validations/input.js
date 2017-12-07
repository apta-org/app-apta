import Joi from 'joi'
import { validateOptions } from '../../validations'

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------
const CourseParamsValidations = {
  params: {
    id: Joi.string().required()
  }
}

// --------------------------------------------------
//    Schema - Input Validations
// --------------------------------------------------
const CourseCreatePayload = Joi.object().keys({
  course: Joi.object().keys({
    name: Joi.string().required().description('the name of the course').example('BTech'),
    description: Joi.string().required().description('the description of the course').example('Bachelor of Technology'),
    length: Joi.number().greater(0).required().description('the length of the course').example(`4`),
    rank: Joi.number().greater(0).required().description('the rank of the course to maintain sorting').example(`26`)
  })
})

const CourseUpdatePayload = Joi.object().keys({
  course: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    length: Joi.number().greater(0).required(),
    rank: Joi.number().greater(0).required()
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

module.exports = {
  CourseCreatePayloadValidations,
  CourseDeletePayloadValidations,
  CourseUpdatePayloadValidations
}
