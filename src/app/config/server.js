/* importar o módulo do framework express */
var express = require("express");

/* importar o módulo do consign */
var consign = require("consign");

/* importar o módulo do body-parser */
var bodyParser = require("body-parser");

/* importar o módulo do express-validator */
var session = require("express-session");

/* iniciar o objeto do express */
var app = express();

/* configurar o middleware body-parser */
/* Configuração para receber dados via x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true }));
/* Configuração para receber dados via raw JSON(application/json) */
/* Fazer os testes via Postman */
app.use(bodyParser.json());

/* Configuração da sessão */
let configSession = {
  secret: "gcpssession", // Chave secreta
  resave: false, // Se true, a sessão será regravada no servidor
  saveUninitialized: false, // Se true cria uma nova sessão sempre que a mesma for modificada.
};
/* Configurando o sessin na aplicação */
app.use(session(configSession));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
var caminho = "./src/app/";
/* Configuração do consign para utilização dos arquivos sem a necessidade de chamar a função require() */
consign({
  locale: "pt-br",
})
  .include(caminho + "config/dbConnection.js")
  .then("./models/index.js")
  .then(caminho + "server")
  .then(caminho + "model")
  .then(caminho + "usecase")
  .then(caminho + "controller")
  .then(caminho + "route")
  .into(app);

/* Configuração para endereços não existentes na aplicação */
app.use(function (req, res, next) {
  res.status(404).json({ mensagem: "Recurso não encontrado." });
  next();
});

/* Configuração para erros internos da aplicação */
app.use(function (err, req, res, next) {
  res.status(500).json({
    mensagem: "Erro interno.",
    error: err.toString(),
    contato: "jairmaiag@gmail.com",
  });
  next();
});

/* exportar o objeto app */
module.exports = app;
