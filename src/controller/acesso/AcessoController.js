const repository = require('../../db/repository/UsuarioRepository')
const { serverError, badRequest, ok } = require('../../app/helpers/http/HttpHelpers')

class AcessoController {

  constructor(app) {
    this.app = app
  }

  async login(req) {
    try {
      const filter = req.body
      if (!filter.login || !filter.senha) {
        return badRequest(`${req.i18n_texts.field_login_password_required} ${req.i18n_texts.please_try_again}`)
      }

      const entity = await repository.findByLoginSenha(filter)
      if (!entity) {
        return badRequest(`${req.i18n_texts.username_password_invalid} ${req.i18n_texts.please_try_again}`)
      }

      return ok(entity)
    } catch (error) {
      return serverError(error)
    }
  }

  async logout() { }

}

module.exports = () => AcessoController
