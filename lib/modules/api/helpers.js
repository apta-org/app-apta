
const joiResponseErrorHandler = (err) => {
  if (err.isJoi) {
    const response = {
      errors: {}
    }

    err.details.forEach((error) => {
      response.errors[error.context.key] = [error.message]
    })

    return response
  }
  return null
}

const mongooseResponseValidationErrorHandler = (err) => {
  if (err.name && err.name === 'ValidationError') {
    const response = {
      errors: {}
    }

    const keys = Object.keys(err.errors)
    keys.forEach((index) => {
      const key = err.errors[index]
      if (key.hasOwnProperty('message')) {
        response.errors[index] = [`'${err.errors[index].value}' ${err.errors[index].message}`]
      }
    })
    return response
  }
  return null
}

const defaultResponseErrorHandler = (err) => {
  const response = {
    errors: {}
  }

  response.errors[err.name] = [err.message]
  return response
}

const errorHandlers = [joiResponseErrorHandler, mongooseResponseValidationErrorHandler, defaultResponseErrorHandler]

const constructErrorResponse = (err) => {
  let response
  for (const handler in errorHandlers) {
    const handlerFn = errorHandlers[handler]
    if (typeof (handlerFn) === 'function') {
      response = handlerFn(err)
      if (response !== null) {
        break
      }
    }
  }
  return response
}

module.exports = {
  constructErrorResponse
}
