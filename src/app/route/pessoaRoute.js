/* 403 Forbidden
   O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta.
   Utilizar quando o usuário não tem permisão(não está logado)

   401 Unauthorized
  Embora o padrão HTTP especifique 'unauthorized', semanticamente, essa resposta significa 'unauthenticated'. 
  Ou seja, o cliente deve se autenticar para obter a resposta solicitada

  403 Forbidden
  O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta. 
  Diferente do código 401, aqui a identidade do cliente é conhecida.
*/

module.exports = function (app) {
  var controller = new app.src.app.controller.pessoa.PessoaController(app)
  var util = new app.src.app.server.Util(app)

  app.get('/pessoa', async function (req, res) {
    const entitys = await controller.index(req.body.attributes, req.body.filter, req.body.order)
    
    if (entitys.length > 0 ) {
      res.status(200).json(entitys)
    } else {
      res.status(400).json(util.montarMensagemJson(
        'Recurso não encontrado. ' + entitys.length + ' registros encontrados.'
      ))
    }
  })

  app.get('/pessoa/paginacao', async function (req, res) {
    let parametros = req.query;
    let page = {};
    page.fieldName = parametros.fieldName || "id";
    page.previousId = parametros.previousId || 0;
    page.next = parametros.next || 0;
    page.size = parametros.size || 10;
    page.totalRows = parametros.totalRows || 0;
    page.total = parametros.total || 1;
    page.fieldOrder = parametros.fieldOrder || "id";
    page.directionOrder = parametros.directionOrder || "ASC";

    const pageEntitys = await controller.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, page)
    
    if (pageEntitys.rows.length > 0 ) {
      res.status(200).json(pageEntitys)
    } else {
      res.status(400).json(util.montarMensagemJson(
        'Recurso não encontrado. ' + pageEntitys.rows.length + ' registros encontrados.'
      ))
    }
  })

  app.get('/pessoa/:id', async function (req, res) {
   const entity = await controller.findById(req.params.id)

   if (entity) {
     res.status(200).json(entity)
   } else {
     res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
   }
  })
  
  app.get('/pessoa/UUId/:UUId', async function (req, res) {
    const entity = await controller.findByUUId(req.params.UUId)

    if (entity) {
      res.status(200).json(entity)
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
    }
  })

  app.post('/pessoa', async function (req, res) {
    const entity = await controller.insert(req.body)
    
    if (entity) {
      res.status(201).json(entity)
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não incluido.'))
    }
  })
  
  app.put('/pessoa', async function (req, res) {
    const id = req.body.id
    if (id) {
      const qtdAtualizado = await controller.update(req.body)

      if (qtdAtualizado) {
        res.status(200).json(util.montarMensagemJson('Total atualizado: ' + qtdAtualizado))
      } else {
        res.status(404).json(util.montarMensagemJson('Recurso não encontrado para ser atualizado.'))
      }
    } else {
      res.status(400).json(util.montarMensagemJson('Envio do campo Id é obrigatório.'))
    }
  })

  app.delete('/pessoa/:id', async function (req, res) {
    const qtdRemovido = await controller.delete(req.params.id)

    if (qtdRemovido) {
      res.status(200).json(util.montarMensagemJson('Total removido: ' + qtdRemovido))
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
    }
  })
}
