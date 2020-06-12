module.exports = function (app) {
  var controller = new app.src.app.controller.acesso.AcessoController(app);
  var util = new app.src.app.server.Util(app);

  app.post("/login", async function (req, res) {
    const filter = req.body;
    console.log(filter);
    if (
      Object.is(filter.login, undefined) ||
      Object.is(filter.senha, undefined)
    ) {
      res
        .status(400)
        .json(
          util.montarMensagemJson("Campos de Login e Senha são obrigatórios.")
        );
      return;
    }
    const usuario = await controller.login(filter);
    if (usuario == null) {
      res.status(404).json(util.montarMensagemJson("Recurso não encontrado."));
    } else {
      res.status(200).json(usuario);
    }
  });
};
