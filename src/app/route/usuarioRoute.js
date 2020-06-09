module.exports = function (app) {
  var controller = new app.src.app.controller.usuario.UsuarioController(app);
  var util = new app.src.app.server.Util(app);
  app.get("/usuario", async function (req, res) {
    controller.index(req.query.filter).then((pessoas) => {
      let total = pessoas.length;
      if (total > 0) {
        res.status(200).json(pessoas);
      } else {
        res
          .status(404)
          .json(
            util.montarMensagemJson(
              "Recurso não encontrado. " + total + " registros encontados."
            )
          );
      }
    });
  });

  app.get("/usuario/:id", async function (req, res) {
    await controller.findById(req.params.id).then((pessoa) => {
      if (!Object.is(pessoa, null)) {
        res.status(200).json(pessoa);
      } else {
        res
          .status(404)
          .json(util.montarMensagemJson("Recurso não encontrado."));
      }
    });
  });

  app.post("/usuario", async function (req, res) {
    await controller.insert(req.body).then((entity) => {
      if (!Object.is(entity, null)) {
        res.status(200).json(entity);
      } else {
        res.status(404).json(util.montarMensagemJson("Recurso não criado."));
      }
    });
  });

  app.put("/usuario", async function (req, res) {
    let id = req.body.id;
    if (id === undefined) {
      res
        .status(404)
        .json(util.montarMensagemJson("Envio do campo Id é obrigatório."));
      return;
    }
    let entity = controller.update(req.body);
    if (entity !== "null") {
      res.status(200).json(entity);
    } else {
      res
        .status(404)
        .json(
          util.montarMensagemJson(
            "Registro não encontrado para ser atualizado."
          )
        );
    }
  });

  app.delete("/usuario/:id", async function (req, res) {
    let qtdRemovido = await controller.delete(req.params.id);
    if (qtdRemovido !== "0") {
      res.status(200).json(util.montarMensagemJson("Total removido: " + qtdRemovido));
    } else {
      res.status(404).json(util.montarMensagemJson("Registro não encontrado."));
    }
  });
};
