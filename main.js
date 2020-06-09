/* importar as configurações do servidor */
var app = require("./src/app/config/server");

/* parametrizar a porta de escuta */
app.listen(80, function () {
  console.log("Servidor online");
});

/* Utilizar o comando abaixo para sincronizar o banco, criando as tabelas. 
app.models.index.sequelize.sync().then(function () {
  app.listen(80, function () {
    console.log("Servidor online");
  });
})
*/
