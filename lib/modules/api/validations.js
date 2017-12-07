import Joi from 'joi'
import _ from 'lodash'
import Helpers from './helpers'

const errorHandler = (request, reply, source, error) => {
  return reply(Helpers.constructErrorResponse(error.data)).code(422)
}

const validateOptions = {
  options: { abortEarly: false },
  failAction: errorHandler
}

const schemaForStatusCode = (statusCode) => {
  const schema = {
    errors: {}
  }
  schema.errors[statusCode] = Joi.array().items(Joi.string())
  return Joi.object().keys(schema)
}

const BadRequestStatus = {
  status: {
    400: schemaForStatusCode(400)
  }
}

const NotFoundStatus = {
  status: {
    404: schemaForStatusCode(404)
  }
}

const ErrorsOutputValidations = {
  status: {
    500: schemaForStatusCode(500)
  }
}

const ErrorsOnPutOutputValidations = _.merge({}, ErrorsOutputValidations)
const ErrorsOnDeleteOutputValidations = _.merge({}, ErrorsOutputValidations, NotFoundStatus, BadRequestStatus)
const ErrorsOnPostOutputValidations = _.merge({}, ErrorsOutputValidations, NotFoundStatus, BadRequestStatus)

module.exports = {
  errorHandler,
  BadRequestStatus,
  ErrorsOnPutOutputValidations,
  ErrorsOnDeleteOutputValidations,
  ErrorsOnPostOutputValidations,
  schemaForStatusCode,
  validateOptions
}
