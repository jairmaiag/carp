class UcMain {
  constructor(app) {
    this.app = app;
  }
  index(req, res) {
    res.status(200).json({ mensagem: "Sistema GCPS Ativo!" });
  }
}

function retorno(app) {
  return new UcMain(app);
}

module.exports = function () {
  return retorno;
};
