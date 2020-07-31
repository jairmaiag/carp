/* importar o módulo do framework express */
const express = require("express")

/* Necessário para acesso de outros domínos */
var cors = require("cors")

/* Para configurar as variáveis de ambiente da aplicação */
require("dotenv/config")

/* importar o módulo do consign */
const consign = require("consign")

/* importar o módulo do body-parser */
const bodyParser = require("body-parser")

/* importar o módulo do express-validator */
const session = require("express-session")

/* iniciar o objeto do express */
const app = express()

/* configurar o middleware body-parser */
/* Configuração para receber dados via x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true }))
/* Configuração para receber dados via raw JSON(application/json) */
/* Fazer os testes via Postman */
app.use(bodyParser.json())

/* Configuração da sessão */
const configSession = {
  secret: "carpssession", // Chave secreta
  resave: false, // Se true, a sessão será regravada no servidor
  saveUninitialized: false, // Se true cria uma nova sessão sempre que a mesma for modificada.
}
/* Configurando o sessin na aplicação */
app.use(session(configSession))

/* Pre configurando as requisições e as respostas para evitar erros *
/* Access-Control-Allow-Origin - para permitir que seja feita a resposta para qualquer cliente */

/* Configurando a aplicação para receber requisições de outros domínio */
app.use(cors())

app.use(function (req, res, next) {
  /* Habilita requisições cros domain, requisições de domínos diferentes 
  res.setHeader("Access-Control-Allow-Origin", "*")

  */
  /* Quais os métodos que a origem pode requisitar 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  */

  /* Habilitar que a requisição feita pela origem tenha cabeçalhos reescritos 
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    )
  */

  /*  
  res.setHeader("Access-Control-Allow-Credentials", true)
  */

  /* Tratamento para acesso aos recuros
     Verifica se existe um usuário logado
     Para login e logout veja no arquivo acessoRoute.js
  */
  if (process.env.NODE_ENV === "production") {
    let urlOrigem = req.originalUrl
    if (urlOrigem === "/" || urlOrigem === "/login") {
      next()
      return
    }
    if (req.session.usuario === undefined) {
      res.status(401).json({
        mensagem:
          "Não existe um usuário logado. Por favor tente fazer o login.",
      })
      return
    }
  }
  next()
})

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
const caminho = "./src/app/"
/* Configuração do consign para utilização dos arquivos sem a necessidade de chamar a função require() */
consign({
  locale: "pt-br",
})
  .include(caminho + "config/dbConnection.js")
  .then("./models/index.js")
  .then(caminho + "server")
  .then(caminho + "repository")
  .then(caminho + "usecase")
  .then(caminho + "controller")
  .then(caminho + "route")
  .into(app)

/* Configuração para endereços não existentes na aplicação */
app.use(function (req, res, next) {
  res.status(404).json({ mensagem: "Rota não encontrada." })
  next()
})

/* Configuração para erros internos da aplicação */
app.use(function (err, req, res, next) {
  res.status(500).json({
    mensagem: "Erro interno.",
    error: err.toString(),
    contato: "jairmaiag@gmail.com",
  })
  next()
})

/* exportar o objeto app */
module.exports = app
