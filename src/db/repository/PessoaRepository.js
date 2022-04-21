const { Pessoa } = require('../models');
const BaseRepository = require('../interfaces/BaseRepository');
const includeUsuario = { association: 'Usuario', attributes: ['id', 'UUId', 'login', 'expira', 'ativo'] };

class PessoaRepository extends BaseRepository {
  constructor() {
    super(Pessoa,[includeUsuario]);
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
