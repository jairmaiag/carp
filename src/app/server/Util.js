class Util {
  constructor(app) {
    this.app = app;
  }
  async usuarioLogado(req) {
    console.log(req.session);
  }
  montarMensagemJson(mensagem) {
    return { mensagem: mensagem };
  }
}

function retorno(app) {
  return new Util(app);
}

module.exports = function () {
  return retorno;
};
