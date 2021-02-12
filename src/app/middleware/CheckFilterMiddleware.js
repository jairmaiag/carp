const { serverError, noContent, forbidden } = require('../helpers/http/HttpHelpers')
const InvalidParamError = require('../errors/InvalidParamError')
const util = require('../util/Util')

class CheckFilterMiddleware {
  async execute(req) {
    try {
      if (util.isEmpty(req.body.filter)) {
        return forbidden(new InvalidParamError(`${req.i18n_texts.invalidParam}`))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = CheckFilterMiddleware
