var fs = require("fs");
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
  app.get("/criarbanco", function (req, res) {
    res
      .status(200)
      .send(
        'Passe os dados utilizando o method POST, no formato json como abaixo: <br />{<br />"host":"enderecoBanco", <br />"porta":5432, <br />"banco":"postgres",<br />"usuario":"postgres", <br />"senha":"senhaBanco" <br />} <br />Substituindo os dados para a conexão com o banco padrão do Postgres.'
      );
  });
  app.post("/criarbanco", async function (req, res) {
    if (!validaCampos(req.body)) {
      res.status(400).json({
        mensagem:
          "Formato esperado como no exemplo: {\"host\":'enderecoBanco', 'porta':5432,'banco':'postgres','usuario':'postgres','senha':'senhaBanco'} - Substituindo as aspas simples por aspas duplas.",
      });
      return;
    }
    const retono = await controller.criarBanco(req.body);
    res.status(200).json({
      mensagem: "Verifique o console do nodejs para ver os resultados.",
    });
  });
  app.get("/pdf", function (req, res) {
    var tempFile = "./progit.pdf";
    fs.readFile(tempFile, function (err, data) {
      if (err) {
        console.log(err);
      }
      res.contentType("application/pdf");
      res.send(data);
    });
  });
};
