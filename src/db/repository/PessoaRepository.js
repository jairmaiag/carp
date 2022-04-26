const AbstractRepository = require('../abstract/AbstractRepository');
const { Pessoa } = require('../models');
const DbUtil = require('../DbUtil');

class PessoaRepository extends AbstractRepository {
  constructor() {
    super(Pessoa,[DbUtil.getIncludeUsuario()]);
  }

  async findDuplicate(dados) {
    let { nome, nomemeio, sobrenome } = dados;
    nomemeio = nomemeio || null;
    sobrenome = sobrenome || null;
    let objConsulta = { where: { nome, nomemeio, sobrenome } };
    return await this.model.findOne(objConsulta);
  }

}

module.exports = new PessoaRepository();
