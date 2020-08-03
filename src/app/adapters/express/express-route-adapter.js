const http = require('../../helpers/http/http-helpers')

module.exports = function (controller) {
  return async (req, res) => {

    let httpResponse = null
    
    if (req.originalUrl.toLowerCase().includes('id')) {
      httpResponse = await controller.findByUUId(req)
      
    } else {
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
