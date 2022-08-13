module.exports = (app) => {
  const controller = new app.controller.implement.main.MainController(app);

  app.get("/", async function (req, res) {
    let httpResponse = await controller.index(req, res);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body });
    }
  });
  
  app.get("/testarconexaobanco",async function (req, res) {
    const httpResponse = await controller.testarConexaoBanco(req.body);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  });

  app.get("/criarbanco", function (req, res) {
    res.status(200).send(
      'Utilize o method <strong>POST</strong>, passando os dados no formato json abaixo: <br />{<br />"host":"enderecoBanco", <br />"porta":5432, <br />"banco":"postgres",<br />"usuario":"postgres", <br />"senha":"senhaBanco" <br />} <br />Substituindo os dados para a conexão com o banco padrão do Postgres.');
  });

  app.post("/criarbanco", async function (req, res) {
    if (!controller.validarCamposConexao(req.body)) {
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
