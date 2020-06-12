/* 403 Forbidden
   O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta.
   Utilizar quando o usuário não tem permisão(não está logado)

   401 Unauthorized
  Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". 
  Ou seja, o cliente deve se autenticar para obter a resposta solicitada

  403 Forbidden
  O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta. 
  Diferente do código 401, aqui a identidade do cliente é conhecida.
*/
//const { Pessoa } = require("../../../models");
module.exports = function (app) {
  var controller = new app.src.app.controller.pessoa.PessoaController(app);
  var util = new app.src.app.server.Util(app);

  app.get("/pessoa", async function (req, res) {
    /*  200 OK 
        Estas requisição foi bem sucedida.
    */
    //await util.usuarioLogado(req);
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

  app.get("/pessoa/:id", async function (req, res) {
    /* 204 No Content 
         Não há conteúdo para enviar para esta solicitação, mas os cabeçalhos podem ser úteis.
    */
   const entity = await controller.findById(req.params.id)
   
   let isNull = Object.is(entity, null);
   if (!isNull) {
     res.status(201).json(entity);
   } else {
     res
       .status(404)
       .json(util.montarMensagemJson("Recurso não encontrado."));
   }
   return;

    // await controller.findById(req.params.id).then((entity) => {
    //   let isNull = Object.is(entity, null);
    //   if (!isNull) {
    //     res.status(201).json(entity);
    //   } else {
    //     res
    //       .status(404)
    //       .json(util.montarMensagemJson("Recurso não encontrado."));
    //   }
    //   return;
    // });
  });

  app.post("/pessoa", async function (req, res) {
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

  app.put("/pessoa", async function (req, res) {
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
    const entity = await controller.update(req.body)
    if (entity[0] === 1) {
      res.redirect("/pessoa/" + id);
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

  app.delete("/pessoa/:id", async function (req, res) {
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
