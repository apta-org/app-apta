const Joi = require('joi')
const { validateOptions } = require('../../validations')

const regExYear = new RegExp('[0-9]{4}')

const ReferralCreatePayload = Joi.object().keys({
  referral: Joi.object().keys({
    memberFirstName: Joi.string().required().description('the firstName of the member').example('Sourav'),
    memberLastName: Joi.string().required().description('the lastName of the member').example('Ganguly'),
    memberPhone: Joi.string().required().description('the phone number of the member').example('7701234567'),
    memberEmail: Joi.string().required().email().description('the email of the member').example('sourav.ganguly@gmail.com'),
    studentFirstName: Joi.string().required().description('the firstName of the student').example('Jyothi'),
    studentLastName: Joi.string().required().description('the lastName of the student').example('Meesala'),
    studentEmail: Joi.string().email().required().description('the email of the student').example('jyothi.meesala@gmail.com'),
    asepYear: Joi.string().required().description('the ASEP year').example('2018')
  })
})

const ReferralByIdParamsValidations = {
  params: {
    id: Joi.string().required().description('Student referral identification')
  }
}

const ReferralByIdPayloadValidations = Object.assign({
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, ReferralByIdParamsValidations)

const ReferralByStudentEmailQueryValidations = {
  query: {
    email: Joi.string().required().email().description('Student Email'),
    year: Joi.string().regex(regExYear).required().description('ASEP Year')
  },
  failAction: validateOptions.failAction
}

const ReferralListByYearQueryValidations = {
  query: {
    year: Joi.string().regex(regExYear).required().description('ASEP Year')
  },
  failAction: validateOptions.failAction
}

const ReferralListByMemberEmailQueryValidations = {
  query: {
    memberEmail: Joi.string().required().email().description('Member Email'),
    year: Joi.string().regex(regExYear).required().description('ASEP Year')
  },
  failAction: validateOptions.failAction
}

const ReferralListByMemberQueryValidations = {
  query: {
    memberFirstName: Joi.string().required().description('Member First Name'),
    memberLastName: Joi.string().required().description('Member Last Name'),
    year: Joi.string().regex(regExYear).required().description('ASEP Year')
  },
  failAction: validateOptions.failAction
}

const ReferralCreatePayloadValidations = Object.assign({
  payload: ReferralCreatePayload,
  options: validateOptions.options,
  failAction: validateOptions.failAction
})

module.exports = {
  ReferralByIdPayloadValidations,
  ReferralByStudentEmailQueryValidations,
  ReferralListByYearQueryValidations,
  ReferralListByMemberEmailQueryValidations,
  ReferralListByMemberQueryValidations,
  ReferralCreatePayloadValidations
}
