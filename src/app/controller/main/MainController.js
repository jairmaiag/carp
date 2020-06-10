class MainController {
  constructor(app) {
    this.app = app;
    this.casoUso = new app.src.app.usecase.UcMain(app);
  }
  index(req, res) {
    this.casoUso.index(req, res);
  }
  async criarBanco(dadosConexao) {
    return await this.casoUso.criarBanco(dadosConexao);
  }
}
function retorno(app) {
  return new MainController(app);
}

module.exports = function (app) {
  return retorno;
};
