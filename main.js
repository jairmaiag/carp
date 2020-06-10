/* importar as configurações do servidor */
var app = require("./src/app/config/server");

/* parametrizar a porta de escuta */
let port = 80;
app.listen(port, function () {
  //console.clear();
  console.log("Servidor online na port: " + port);
  console.log("Acesse http://localhost");
  console.log(
    "Para criar o banco acesse http://localhost/criarbanco e siga as instruções."
  );
});

/* Utilizar o comando abaixo para sincronizar o banco, criando as tabelas. 
app.models.index.sequelize.sync().then(function () {
  app.listen(80, function () {
    console.log("Servidor online");
  });
})
*/
