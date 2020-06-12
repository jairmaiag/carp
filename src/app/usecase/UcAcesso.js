class UcAcesso {
  constructor(app) {
    this.app = app;
    this.repository = null;
  }
  criarRepository() {
    return (this.repository = new this.app.src.app.repository.UsuarioRepository(
      this.app
    ));
  }
  async findByLoginSenha(filter) {
    this.repository = this.criarRepository();
    return await this.repository.findByLoginSenha(filter);
  }
}

function retorno(app) {
  return new UcAcesso(app);
}

module.exports = function () {
  return retorno;
};
