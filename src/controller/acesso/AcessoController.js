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
        return badRequest('Campos de Login e Senha são obrigatórios.')
      }

      const entity = await repository.findByLoginSenha(filter)
      if (!entity) {
        return badRequest('Usuário ou senha inválida')
      }

      return ok(entity)
    } catch (error) {
      return serverError(error)
    }
  }

  async logout() { }

}

function retorno(app) {
  return new AcessoController(app)
}

module.exports = () => retorno
