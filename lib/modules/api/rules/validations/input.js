const Joi = require('joi')
const { validateOptions } = require('../../validations')

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------
const RulesByCourseAndAcademicYearParamsValidations = {
  params: {
    id: Joi.string().required().description('Course Id'),
    academicYear: Joi.number().required().description('Course Year')
  }
}

const RulesByCourseNameParamsValidations = {
  params: {
    courseName: Joi.string().required().description('Course Name')
  }
}

const RuleCreateParamsValidations = {
  params: {
    id: Joi.string().required().description('Course Id')
  }
}

const RuleCommonParamsValidations = {
  params: {
    id: Joi.string().required().description('Rule Id')
  }
}

// --------------------------------------------------
//    Schema - Input Validations
// --------------------------------------------------
const RuleCreatePayload = Joi.object().keys({
  rule: Joi.object().keys({
    name: Joi.string().required().description('the name of the rule').example('NewCourse'),
    academicYear: Joi.number().greater(0).required().description('the current academicYear').example('1'),
    requiredCourseDescription: Joi.string().required().description('the description of the course').example('Course 2nd Year'),
    order: Joi.number().greater(0).required().description('the order of the rule').example('4'),
    enabled: Joi.boolean().required().description('the rule status enabled or disabled').example('true')
  })
})

const RuleUpdatePayload = Joi.object().keys({
  rule: Joi.object().keys({
    name: Joi.string().required(),
    academicYear: Joi.number().greater(0).required(),
    requiredCourseDescription: Joi.string().required(),
    order: Joi.number().greater(0).required(),
    enabled: Joi.boolean().required()
  })
})

const RulesByCourseAndAcademicYearValidations = Object.assign({
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, RulesByCourseAndAcademicYearParamsValidations)

const RulesByCourseNameValidations = Object.assign({
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, RulesByCourseNameParamsValidations)

const RuleCreatePayloadValidations = Object.assign({
  payload: RuleCreatePayload,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, RuleCreateParamsValidations)

const RuleUpdatePayloadValidations = Object.assign({
  payload: RuleUpdatePayload,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, RuleCommonParamsValidations)

module.exports = {
  RulesByCourseAndAcademicYearValidations,
  RulesByCourseNameValidations,
  RuleCreatePayloadValidations,
  RuleUpdatePayloadValidations
}
