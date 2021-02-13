const { serverError, noContent, forbidden } = require('../helpers/http/HttpHelpers')
const InvalidParamError = require('../errors/InvalidParamError')
const util = require('../util/Util')
const validator = require('validator')
const { getUUIDV4 } = require('../util/UUIDGenerator')

class CheckUUIdMiddleware {
  async execute(req) {
    try {
      let UUId = null
      const method = req.method.toUpperCase()

      if (req.body.UUId === undefined) {
        UUId = req.params.UUId
      } else {
        UUId = req.body.UUId
      }

      if (util.isEmpty(UUId)) {
        if (method === 'POST') {
          req.body.UUId = getUUIDV4()
          UUId=req.body.UUId;
        } else {
          return forbidden(new InvalidParamError(`${req.i18n_texts.UUId_required}`))
        }
      }
      if (!validator.isUUID(UUId, 4)) {
        return forbidden(new InvalidParamError(`${req.i18n_texts.UUId_invalid_format}`))
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = CheckUUIdMiddleware
