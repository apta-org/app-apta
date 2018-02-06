const Joi = require('joi')
const { validateOptions } = require('../../validations')

const MemberQueryValidations = {
  query: Joi.object().keys({
    phone: Joi.string().regex(/^^([\d]{6}|((\([\d]{3}\)|[\d]{3})( [\d]{3} |-[\d]{3}-)))[\d]{4}$$/).description('Find member by phone number'),
    email: Joi.string().email().description('Find member by email'),
    firstName: Joi.string().description('Find member by first name'),
    lastName: Joi.string().description('Find member by last name')
  }).or('phone', 'email', 'firstName', 'lastName'),
  failAction: validateOptions.failAction
}

module.exports = {
  MemberQueryValidations
}
