const ServerError = require('../../errors/server-error')
const UnauthorizedError = require('../../errors/unauthorized-error')

class httpHelpers {

  ok(data) {
    return {
      statusCode: 200,
      body: data
    }
  }

  noContent() {
    return {
      statusCode: 204,
      body: null
    }
  }

  badRequest(error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  unauthorized() {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }

  forbidden(error) {
    return {
      statusCode: 403,
      body: error
    }
  }

  serverError(error) {
    return {
      statusCode: 500,
      body: new ServerError(error.stack)
    }
  }
}

module.exports = new httpHelpers()
