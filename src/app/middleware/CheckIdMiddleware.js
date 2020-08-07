const { serverError, noContent, forbidden } = require('../helpers/http/HttpHelpers')
const InvalidParamError = require('../errors/InvalidParamError')
const validator = require('validator')

class CheckIdMiddleware {
  async execute (req) {
    try {
      if (!validator.isInt(req.params.id)) {
        return forbidden(new InvalidParamError('O campo Id deve ser do tipo numérico.'))
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = CheckIdMiddleware
