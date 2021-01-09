const { badRequest } = require('../../helpers/http/HttpHelpers')

module.exports = function (app) {
  return async (req, res) => {
    try {
      let rotaNaoEncontrada = false
      let httpResponse = null
      const method = req.method.toUpperCase()
      const url = req.originalUrl
      const { id } = req.params
      const { UUId } = req.params

      const model = req.params.model.charAt(0).toUpperCase() + req.params.model.slice(1)      const controller = eval(`new app.src.controller.${model.toLowerCase()}.${model}Controller(app)`)

      if (method === 'GET') {
        if (UUId) {
          httpResponse = await controller.findByUUId(req)
        } else if (id) {
          httpResponse = await controller.findById(req)
        } else if (url.includes('paginacao')) {
          httpResponse = await controller.findAndPaginate(req)
        } else {
          httpResponse = await controller.index(req)
        }
      } else if (method === 'POST') {
        httpResponse = await controller.insert(req)
      } else if (method === 'PUT') {
        httpResponse = await controller.update(req)
      } else if (method === 'DELETE') {
        if (UUId || id) {
          httpResponse = await controller.delete(req)
        } else {
          rotaNaoEncontrada = true
        }
      } else {
        rotaNaoEncontrada = true
      }

      if (rotaNaoEncontrada) {
        httpResponse = badRequest('Rota não encontrada')
      }

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body
        })
      }
    } catch (error) {
      res.status(400).json({
        mensagem: 'Erro no arquivo ExpressRouteAdapter.',
        error: error.stack
      })
    }
  }
}
