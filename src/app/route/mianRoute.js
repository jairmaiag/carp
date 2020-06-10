module.exports = function (app) {
  const controller = new app.src.app.controller.main.MainController(app);
  const validaCampos = function (dados) {
    if (dados.host === undefined) {
      return false;
    }
    if (dados.porta === undefined) {
      return false;
    }
    if (dados.banco === undefined) {
      return false;
    }
    if (dados.usuario === undefined) {
      return false;
    }
    if (dados.senha === undefined) {
      return false;
    }
    return true;
  };
  app.get("/", function (req, res) {
    controller.index(req, res);
  });
  app.post("/criarbanco", async function (req, res) {
    if (!validaCampos(req.body)) {
      res.status(400).json({
        mensagem:
          "Formato esperado como no exemplo: {'host':'enderecoBanco', 'porta':5432,'banco':'postgres','usuario':'postgres','senha':'senhaBanco'} - Substituindo as aspas simples por aspas duplas.",
      });
      return;
    }
    const retono = await controller.criarBanco(req.body);
    res.status(200).json({
      mensagem: "Verifique o console do nodejs para ver os resultados.",
    });
  });
};
