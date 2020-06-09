var UsuarioController = function (app) {
  this.app = app;
  this.repository = null;
};

UsuarioController.prototype.criarRepository = function () {
  return (this.repository = new this.app.src.app.model.usuario.repository.UsuarioRepository(
    this.app
  ));
};

UsuarioController.prototype.index = async function (filter) {
  this.repository = this.criarRepository();
  return await this.repository.findAll(filter);
};

UsuarioController.prototype.findById = async function (id) {
  this.repository = this.criarRepository();
  return await this.repository.findById(id);
};

UsuarioController.prototype.insert = async function (dados) {
  this.repository = this.criarRepository();
  return await this.repository.insert(dados);
};

UsuarioController.prototype.update = async function (dados) {
  this.repository = this.criarRepository();
  return await this.repository.update(dados);
};

UsuarioController.prototype.delete = async function (id) {
  this.repository = this.criarRepository();
  return await this.repository.delete(id);
};

function retorno(app) {
  return new UsuarioController(app);
}

module.exports = function (app) {
  return retorno;
};
