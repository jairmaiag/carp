class AcessoController {
  constructor(app) {
    this.casoUso = new app.src.app.usecase.UcAcesso(app);
  }
  async login(filter) {
    return await this.casoUso.findByLoginSenha(filter);
  }
}
function retorno(app) {
  return new AcessoController(app);
}

module.exports = function (app) {
  return retorno;
};
