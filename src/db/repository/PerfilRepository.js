const AbstractRepository = require('../abstract/AbstractRepository');
const { Perfil, Recurso, RecursoPerfil } = require('../models');
const util = require('../../app/util/Util');
const DbUtil = require('../DbUtil');
const RecursoRepository = require('./RecursoRepository');
const RecursoPerfilRepository = require('./RecursoPerfilRepository');

class PerfilRepository extends AbstractRepository {
  constructor() {
    super(Perfil, [DbUtil.getIncludeRecursos()]);
    this.recursos = [];
  }

  async findDuplicate(dados) {
    let { nome } = dados;
    let objConsulta = { where: { nome } };
    return await this.model.findOne(objConsulta);
  }

  async beforeInsert(dados) {
    this.recursos = dados.recursos || [];
    return dados;
  }

  async afterInsert(dados) {
    const UUIdRecursos = this.recursos.map(u => u.UUId);
    const idRecurosBanco = await RecursoRepository.findIdsByUUIds(UUIdRecursos);
    const idPerfilBanco = await this.findIdByUUId(dados.UUId);
    const listaRecursosDoPerfil = idRecurosBanco.map(rb => { return { "RecursoId": rb.id, "PerfilId": idPerfilBanco.id } });
    await RecursoPerfilRepository.insertBulk(listaRecursosDoPerfil);
    return dados;
  }

  async beforeUpdate(dados) {
    this.recursos = dados.recursos || [];
    return dados;
  }

  async afterUpdate(dados) {
    let perfilBanco = await this.findByUUId(dados.UUId);
    const idPerfilBanco = await this.findIdByUUId(dados.UUId);
    perfilBanco.PeriflId = idPerfilBanco.id;
    await RecursoPerfilRepository.update(await montarListas(perfilBanco));
    perfilBanco.PeriflId = null;
    return perfilBanco;
  }
  async montarListas(perfilBanco) {
    const recursosBack = perfilBanco.recursos ? perfilBanco.recursos.map((r) => r.dataValues) : [];
    const recursosFron = this.recursos || [];
    if (recursosBack.length === 0 && recursosFron.length === 0) {
      return perfilBanco;
    }
    const listas = await util.montarListasExclusaoInclusao(recursosFron, recursosBack);
    perfilBanco.listaIncluir = listas.listaIncluir;
    perfilBanco.listaExcluir = listas.listaExcluir;
    return perfilBanco;
  }
}

module.exports = new PerfilRepository();
