class AcessoController {

  constructor(app) {
    this.app = app
    this.repository = new this.app.src.app.db.repository.UsuarioRepository(this.app)
  }

  async login(filter) {
    return await this.repository.findByLoginSenha(filter)
  }

  async logout() { }

}

function retorno(app) {
  return new AcessoController(app)
}

module.exports = function () {
  return retorno
}

module.exports = () => retorno
