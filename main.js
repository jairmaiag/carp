/* importar as configurações do servidor */
const app = require('./src/app/server');

/* Captura da passgem de parâmetros via linha de comando */
const param = process.argv;
if(param.length > 2){
  const modo = param[2];
  if(modo === 'production'){
    process.env.NODE_ENV = 'production';
  }
}

/* parametrizar a porta de escuta */
const port = process.env.PORT || 80;
app.listen(port, function () {
  const acesso = `http://localhost${port === 80 ? "" : ":" + port}`;
  console.log(acesso);
  console.log(`Para criar o banco acesse ${acesso}/criarbanco e siga as instruções.\n`);
});
