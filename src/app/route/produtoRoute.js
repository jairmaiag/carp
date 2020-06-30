module.exports = function (app) {
  var controller = new app.src.app.controller.produto.ProdutoController(app)
  var util = new app.src.app.server.Util(app)

  app.get('/produto', async function (req, res) {
    const entitys = await controller.index(req.body.attributes, req.body.filter, req.body.order)
    
    if (entitys.length > 0 ) {
      res.status(200).json(entitys)
    } else {
      res.status(400).json(util.montarMensagemJson(
        'Recurso não encontrado. ' + entitys.length + ' registros encontrados.'
      ))
    }
  })

  app.get('/produto/paginacao', async function (req, res) {
    const pageEntitys = await controller.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.body.page)
    
    if (pageEntitys.rows.length > 0 ) {
      res.status(200).json(pageEntitys)
    } else {
      res.status(400).json(util.montarMensagemJson(
        'Recurso não encontrado. ' + pageEntitys.rows.length + ' registros encontrados.'
      ))
    }
  })

  app.get('/produto/UUId/:UUId', async function (req, res) {
    const entity = await controller.findByUUId(req.params.UUId)
    
    if (entity) {
      res.status(200).json(entity)
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
    }
  })

  app.get('/produto/:id', async function (req, res) {
    const entity = await controller.findById(req.params.id)

    if (entity) {
      res.status(200).json(entity)
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
    }
  })

  app.post('/produto', async function (req, res) {
    const entity = await controller.insert(req.body)
    
    if (entity) {
      res.status(201).json(entity)
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não incluido.'))
    }
  })

  app.put('/produto', async function(req, res) {
    const UUId = req.body.UUId
    if (UUId) {
      const entity = await controller.update(req.body)

      if (entity) {
        res.status(200).json(entity)
      } else {
        res.status(404).json(util.montarMensagemJson('Recurso não encontrado para ser atualizado.'))
      }
    } else {
      res.status(400).json(util.montarMensagemJson('Envio do campo UUId é obrigatório.'))
    }
  })

  app.delete('/produto/UUId/:UUId', async function (req, res) {
    const qtdRemovido = await controller.delete(req.params.UUId)

    if (qtdRemovido) {
      res.status(200).json(util.montarMensagemJson('Total removido: ' + qtdRemovido))
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
    }
  })
}