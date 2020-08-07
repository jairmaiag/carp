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
          UUId = getUUIDV4()
          
          // Colocando o UUId no body da requisição (req.body) do Express
          req.body.UUId = UUId
        } else {
          return forbidden(new InvalidParamError('UUId é um campo obrigatório'))
        }
      }
      if (!validator.isUUID(UUId, 4)) {
        return forbidden(new InvalidParamError('Formato inválido para o campo UUId.'))
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

module.exports = CheckUUIdMiddleware
