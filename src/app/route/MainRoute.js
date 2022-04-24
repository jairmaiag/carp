module.exports = (app) => {
  const controller = new app.controller.implement.main.MainController(app);

  function validaCampos(dados) {
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
  }

  app.get("/", function (req, res) {
    let httpResponse = controller.index(req, res);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  })

  app.get("/criarbanco", function (req, res) {
    res.status(200).send(
      'Passe os dados utilizando o method POST, no formato json como abaixo: <br />{<br />"host":"enderecoBanco", <br />"porta":5432, <br />"banco":"postgres",<br />"usuario":"postgres", <br />"senha":"senhaBanco" <br />} <br />Substituindo os dados para a conexão com o banco padrão do Postgres.')
  });

  app.post("/criarbanco", async function (req, res) {
    if (!validaCampos(req.body)) {
      res.status(400).json({
        mensagem:
          "Formato esperado como no exemplo: {\"host\":'enderecoBanco', 'porta':5432,'banco':'postgres','usuario':'postgres','senha':'senhaBanco'} - Substituindo as aspas simples por aspas duplas.",
      })
      return;
    }

    const httpResponse = await controller.criarBanco(req.body);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  });
}
