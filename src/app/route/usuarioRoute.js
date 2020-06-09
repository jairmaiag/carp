module.exports = function (app) {
  var controller = new app.src.app.controller.usuario.UsuarioController(app);
  var util = new app.src.app.server.Util(app);

  app.get("/usuario", async function (req, res) {
    controller.index(req.query.filter).then((entiys) => {
      let total = entiys.length;
      if (total > 0) {
        res.status(200).json(entiys);
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
    await controller.findById(req.params.id).then((entity) => {
      let isNull = Object.is(entity, null);
      if (!isNull) {
        res.status(201).json(entity);
      } else {
        res
          .status(404)
          .json(util.montarMensagemJson("Recurso não encontrado."));
      }
      return;
    });
  });

  app.post("/usuario", async function (req, res) {
    await controller.insert(req.body).then((entity) => {
      if (entity !== "null") {
        /* 201 Created 
           A requisição foi bem sucedida e um novo recurso foi criado como resultado
        */
        res.status(201).json(entity);
      } else {
        res.status(404).json(util.montarMensagemJson("Recurso não incluido."));
      }
    });
  });

  app.put("/usuario", async function (req, res) {
    let id = req.body.id;
    if (id === undefined) {
      /* 400 Bad Request
         Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
      */
      res
        .status(400)
        .json(util.montarMensagemJson("Envio do campo Id é obrigatório."));
      return;
    }
    await controller.update(req.body).then((entity) => {
      if (! Object.is(entity,null)) {
        res.redirect("/usuario/" + id);
      } else {
        res
          .status(404)
          .json(
            util.montarMensagemJson(
              "Recurso não encontrado para ser atualizado."
            )
          );
      }
    });
  });

  app.delete("/usuario/:id", async function (req, res) {
    let qtdRemovido = await controller.delete(req.params.id);
    if (qtdRemovido !== "0") {
      res
        .status(200)
        .json(util.montarMensagemJson("Total removido: " + qtdRemovido));
    } else {
      res.status(404).json(util.montarMensagemJson("Recurso não encontrado."));
    }
  });
};
