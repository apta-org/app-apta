const Joi = require('joi')
const _ = require('lodash')
const {
  ErrorsOnPutOutputValidations,
  ErrorsOnPostOutputValidations,
  ErrorsOnDeleteOutputValidations
} = require('../../validations')

// --------------------------------------------------
//    Schema - Output Validations
// --------------------------------------------------
const RuleJSON = Joi.object().keys({
  name: Joi.string().required().description('The rule name'),
  academicYear: Joi.number().required().description('The academicYear of the course'),
  requiredCourseDescription: Joi.string().required().description('The required course description'),
  qualifiedMarks: Joi.number().required().description('The minimum percentage of marks required for this course'),
  order: Joi.number().required().description('The rule order for this course'),
  enabled: Joi.boolean().required().description('The rule status enabled or disabled')
})

const ErrorOutputValidation = Joi.object().keys({
  errors: Joi.object().keys({
    name: Joi.array().items(Joi.string()).optional(),
    academicYear: Joi.array().items(Joi.string()).optional(),
    requiredCourseDescription: Joi.array().items(Joi.string()).optional(),
    qualifiedMarks: Joi.array().items(Joi.string()).optional(),
    order: Joi.array().items(Joi.string()).optional(),
    enabled: Joi.array().items(Joi.string()).optional()
  })
})

const SingleRuleOutputPayload = Joi.object().keys({
  rule: RuleJSON
})

const RuleOnPutOutputValidationsConfig = _.merge({}, ErrorsOnPutOutputValidations, {
  status: {
    200: SingleRuleOutputPayload,
    422: ErrorOutputValidation
  }
})

const RuleOnPostOutputValidationsConfig = _.merge({}, ErrorsOnPostOutputValidations, {
  status: {
    200: SingleRuleOutputPayload,
    422: ErrorOutputValidation
  }
})

const RuleOnDeleteOutputValidationsConfig = _.merge({}, ErrorsOnDeleteOutputValidations, {
  status: {
    204: false
  }
})

module.exports = {
  RuleOnPutOutputValidationsConfig,
  RuleOnPostOutputValidationsConfig,
  RuleOnDeleteOutputValidationsConfig
}
