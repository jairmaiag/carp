/* importar as configurações do servidor */
var app = require('./src/app/server');

/* parametrizar a porta de escuta */
let port = process.env.PORT || 80
app.listen(port, function () {
  let acesso = "Acesse http://localhost" + (port == 80 ? "" : ":" + port)
  console.log(acesso)
  console.log(`Para criar o banco acesse ${acesso}/criarbanco e siga as instruções.\n`)
});
