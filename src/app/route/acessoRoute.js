module.exports = function (app) {
  var controller = new app.src.app.controller.acesso.AcessoController(app);
  var util = new app.src.app.server.Util(app);

  app.post("/login", async function (req, res) {
    const filter = req.body;
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
      req.session.usuario = usuario;
      res.status(200).json(usuario);
    }
  });
  app.get("/logout", async function (req, res) {
    req.session.destroy();
    res.status(200).json(util.montarMensagemJson("Usuário não logado."));
  });
};
