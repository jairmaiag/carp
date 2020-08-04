const http = require('../../helpers/http/http-helpers')

module.exports = function (app) {
  return async (req, res) => {
    let rotaNaoEncontrada = false
    let httpResponse = null
    const method = req.method.toUpperCase()
    const url = req.originalUrl
    const { id } = req.params
    const { UUId } = req.params

    const model = req.params.model.charAt(0).toUpperCase() + req.params.model.slice(1)
    const controller = eval(`new app.src.controller.${model.toLowerCase()}.${model}Controller(app)`)

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
    }  else if (method === 'DELETE') {
      if (UUId) {
        httpResponse = await controller.delete(req)
      } else {
        rotaNaoEncontrada = true
      }
    } else {
      rotaNaoEncontrada = true
    }

    if (rotaNaoEncontrada) {
      httpResponse = http.badRequest('Rota não encontrada')
    }

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }   
  }
}
