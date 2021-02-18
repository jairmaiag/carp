/* importar o módulo do framework express */
const express = require('express');

/* Necessário para acesso de outros domínos */
const cors = require('cors');

/* Para configurar as variáveis de ambiente da aplicação */
require('dotenv/config');

/* importar o módulo do consign */
const consign = require('consign');

/* importar o módulo do body-parser */
const bodyParser = require('body-parser');

/* importar o módulo do express-validator */
const session = require('express-session');

/* importar o módulo de checagem de login */
const i18n = require('i18n-express');
const checkLoginMiddleware = require('./middleware/CheckLoginMiddleware');

/*
Importar a biblioteca utilizada para fazer o i18n (internacionalização)
Para mudar o idioma envie o parametro clang=en-us no endereço da url
*/
const i18nConfig = {
  translationsPath: `${__dirname}/i18n`,
  defaultLang: 'pt-br',
  siteLangs: ['pt-br', 'en-us'],
  textsVarName: 'i18n',
};

/* iniciar o objeto do express */
const app = express();

/* configurar o middleware body-parser */
/* Configuração para receber dados via x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

/* Configuração para receber dados via raw JSON(application/json) */
/* Fazer os testes via Postman */
app.use(bodyParser.json());

app.use(i18n(i18nConfig));

/* Configuração da sessão */
const configSession = {
  secret: 'carpssession', // Chave secreta
  resave: false, // Se true, a sessão será regravada no servidor
  saveUninitialized: false, // Se true cria uma nova sessão sempre que a mesma for modificada.
};
/* Configurando o session na aplicação */
app.use(session(configSession));

/*
Pre configurando as requisições e as respostas para evitar erros to tipo
Access-Control-Allow-Origin - para permitir que seja feita a resposta para qualquer cliente
*/

/* Configurando a aplicação para receber requisições de outros domínio */
app.use(cors());

app.use(checkLoginMiddleware);

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
/* Configuração do consign para utilização
* dos arquivos sem a necessidade de chamar a função require()
*/
const consignConfig = {
  cwd: 'src',
  locale: 'pt-br',
  extensions: ['.js', '.json', '.node', '.mjs'],
};
consign(consignConfig)
  .include('db/models/index.js')
  .then('app/util')
  .then('db/repository')
  .then('controller')
  .then('app/route')
  .into(app);

/* Configuração para endereços não existentes na aplicação */
app.use((req, res) => {
  res.status(404).json({ mensagem: req.i18n_texts.route_not_found });
});

/* Configuração para erros internos da aplicação */
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      mensagem: 'Erro interno.',
      error: err.toString(),
      contato: 'jairmaiag@gmail.com',
    });
  }
  next();
});

/* exportar o objeto app */
module.exports = app;
