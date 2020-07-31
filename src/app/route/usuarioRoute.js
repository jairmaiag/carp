module.exports = function (app) {
  var controller = new app.src.app.controller.usuario.UsuarioController(app);
  var util = new app.src.app.util.Util(app);

  app.get('/usuario', async function (req, res) {
    const entities = await controller.index(req.body.attributes, req.body.filter, req.body.order)
    
    if (entities.length > 0 ) {
      res.status(200).json(entities)
    } else {
      res.status(400).json(util.montarMensagemJson(
        'Recurso não encontrado. ' + entities.length + ' registros encontrados.'
      ))
    }
  })

  app.get('/usuario/paginacao', async function (req, res) {
    const pageEntities = await controller.findAndPaginate(req.body.attributes, req.body.filter, req.body.order, req.body.page)
    
    if (pageEntities.rows.length > 0 ) {
      res.status(200).json(pageEntities)
    } else {
      res.status(400).json(util.montarMensagemJson(
        'Recurso não encontrado. ' + pageEntities.rows.length + ' registros encontrados.'
      ))
    }
  })

  app.get('/usuario/UUId/:UUId', async function (req, res) {
    const entity = await controller.findByUUId(req.params.UUId)

    if (entity) {
      res.status(200).json(entity)
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
    }
  })

  app.get('/usuario/:id', async function (req, res) {
    const entity = await controller.findById(req.params.id)

    if (entity) {
      res.status(200).json(entity)
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
    }
  })

  app.post('/usuario', async function (req, res) {
    const entity = await controller.insert(req.body)

    if (entity) {
      res.status(201).json(entity)
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não incluido.'))
    }
  })

  app.put('/usuario', async function(req, res) {
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

  app.delete('/usuario/UUId/:UUId', async function (req, res) {
    const qtdRemovido = await controller.delete(req.params.UUId)

    if (qtdRemovido) {
      res.status(200).json(util.montarMensagemJson('Total removido: ' + qtdRemovido))
    } else {
      res.status(404).json(util.montarMensagemJson('Recurso não encontrado.'))
    }
  })
}
