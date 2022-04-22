const { Pessoa } = require('../models');
const BaseRepository = require('../abstract/BaseRepository');
const DbUtil = require('../DbUtil');

class PessoaRepository extends BaseRepository {
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

module.exports = () => new PessoaRepository();
