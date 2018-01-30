const Joi = require('joi')
const { validateOptions } = require('../../validations')

const regExEmail = new RegExp('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)')
const regExPhone = new RegExp('[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}')
const regExPinCode = new RegExp('[0-9]{6}')
const regExDateOfBirth = new RegExp('((0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2})')

// --------------------------------------------------
//    Config - Input Validations
// --------------------------------------------------
const StudentByIdParamsValidations = {
  params: {
    id: Joi.string().required().description('Student identification')
  }
}

const StudentByEmailQueryValidations = {
  query: {
    email: Joi.string().required().regex(regExEmail).description('Find student by email')
  },
  failAction: validateOptions.failAction
}

const StudentByNameQueryValidations = {
  query: Joi.object().keys({
    firstName: Joi.string().required().description('Find student by name'),
    lastName: Joi.string().required().description('Find student by name')
  }),
  failAction: validateOptions.failAction
}

const StudentsByFirstNameQueryValidations = {
  query: {
    firstName: Joi.string().required().description('Find students matching by firstName')
  },
  failAction: validateOptions.failAction
}

const StudentsByLastNameQueryValidations = {
  query: {
    lastName: Joi.string().required().description('Find students matching by lastName')
  },
  failAction: validateOptions.failAction
}

const StudentsByPhoneNumberQueryValidations = {
  query: {
    phone: Joi.string().required().regex(regExPhone).description('Find students matching by phone number')
  },
  failAction: validateOptions.failAction
}

const StudentsByLocationQueryValidations = {
  query: Joi.object().keys({
    city: Joi.string().description('Find students matching by city'),
    district: Joi.string().description('Find students matching by district'),
    state: Joi.string().description('Find students matching by state'),
    pinCode: Joi.string().regex(regExPinCode).description('Find students matching by pinCode')
  }).or('city', 'district', 'state', 'pinCode'),
  failAction: validateOptions.failAction
}

const StudentCreatePayload = Joi.object().keys({
  student: Joi.object().keys({
    firstName: Joi.string().required().description('the firstName of the student').example('Jyothi'),
    lastName: Joi.string().required().description('the lastName of the student').example('Meesala'),
    email: Joi.string().required().regex(regExEmail).description('the email id of the student').example('jyothi.meesala@gmail.com'),
    dateOfBirth: Joi.string().regex(/^((0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2})$/).description('the dateOfBirth of the student').example('11/29/2001'),
    placeOfBirth: Joi.string().description('the placeOfBirth of the student').example('Guntur'),
    phonePrimary: Joi.string().regex(regExPhone).description('the phonePrimary of the student').example('7701234567'),
    phoneSecondary: Joi.string().regex(regExPhone).description('the phoneSecondary of the student').example('7701237654'),
    addressLane1: Joi.string().description('the addressLane1 of the student').example('HNo:2-3/4, Sivalayam Street'),
    addressLane2: Joi.string().description('the addressLane2 of the student').example('Kovvur Mandal'),
    city: Joi.string().description('the city of the student').example('Guntur'),
    district: Joi.string().description('the district of the student').example('Guntur District'),
    state: Joi.string().description('the state of the student').example('Andhra Pradesh'),
    pinCode: Joi.string().regex(regExPinCode).description('the pinCode of the student').example('534006')
  })
})

const StudentUpdatePayload = Joi.object().keys({
  student: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().regex(regExEmail),
    dateOfBirth: Joi.string().regex(regExDateOfBirth).required(),
    placeOfBirth: Joi.string().required(),
    phonePrimary: Joi.string().regex(regExPhone).required(),
    phoneSecondary: Joi.string().regex(regExPhone),
    addressLane1: Joi.string().required(),
    addressLane2: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    state: Joi.string().required(),
    pinCode: Joi.string().regex(regExPinCode).required()
  })
})

const StudentByIdPayloadValidations = Object.assign({
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, StudentByIdParamsValidations)

const StudentCreatePayloadValidations = {
  payload: StudentCreatePayload,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}

const StudentUpdatePayloadValidations = Object.assign({
  payload: StudentUpdatePayload,
  options: validateOptions.options,
  failAction: validateOptions.failAction
}, StudentByIdPayloadValidations)


module.exports = {
  StudentByIdPayloadValidations,
  StudentByEmailQueryValidations,
  StudentByNameQueryValidations,
  StudentsByFirstNameQueryValidations,
  StudentsByLastNameQueryValidations,
  StudentsByPhoneNumberQueryValidations,
  StudentsByLocationQueryValidations,
  StudentCreatePayloadValidations,
  StudentUpdatePayloadValidations
}
