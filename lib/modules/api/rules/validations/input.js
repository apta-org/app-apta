const Joi = require('joi')
const { validateOptions } = require('../../validations')

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------
const RulesByCourseAndAcademicYearParamsValidations = {
  params: {
    id: Joi.string().required(),
    academicYear: Joi.number().required()
  }
}

const RulesByCourseNameParamsValidations = {
  params: {
    courseName: Joi.string().required()
  }
}

const RulesByCourseAndAcademicYearValidations = Object.assign({
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, RulesByCourseAndAcademicYearParamsValidations)

const RulesByCourseNameValidations = Object.assign({
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, RulesByCourseNameParamsValidations)

module.exports = {
  RulesByCourseAndAcademicYearValidations,
  RulesByCourseNameValidations
}
