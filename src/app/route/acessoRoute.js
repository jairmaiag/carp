const util = require('../util/Util')

module.exports = function (app) {
  var controller = new app.src.controller.acesso.AcessoController(app)

  app.get("/login", async function (req, res) {
    res.status(401).json({mensagem: `${req.i18n_texts.method_invalid}`})
  })

  app.post("/login", async function (req, res) {
    const httpResponse = await controller.login(req)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      req.session.usuario = httpResponse.body
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  })

  app.get("/logout", async function (req, res) {
    try {
      req.session.destroy()
      res.status(200).json(util.montarMensagemJson(req.i18n_texts.user_not_logged_in))
    } catch (error) {
      res.status(500).json(error)
    }
  })
}
