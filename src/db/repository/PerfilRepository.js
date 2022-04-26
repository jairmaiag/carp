const AbstractRepository = require('../abstract/AbstractRepository');
const { Perfil, Recurso, RecursoPerfil } = require('../models');
const util = require('../../app/util/Util');
const DbUtil = require('../DbUtil');
const RecursoRepository = require('./RecursoRepository');
const RecursoPerfilRepository = require('./RecursoPerfilRepository');

class PerfilRepository extends AbstractRepository {
  constructor() {
    super(Perfil, [DbUtil.getIncludeRecursos()]);
    super.addModelsHasMany([Recurso, RecursoPerfil]);
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
    const recurosBanco = await RecursoRepository.findIdsByUUIds(UUIdRecursos);
    const perfilBanco = await this.findIdsByUUIds([dados.UUId]);
    const recursosDoPerfil = recurosBanco.map(rb => { return { "RecursoId": rb.id, "PerfilId": perfilBanco[0].id } });

    await RecursoPerfilRepository.insertBulk(recursosDoPerfil);
    console.log(recursosDoPerfil);

    return dados;
    // return this.manutencaoRecursos(dados.Recursos, dados);
  }
  async afterUpdate(dados) {
    console.log(dados);
    return dados;
  }
  async manutencaoRecursos(dados, perfil) {
    const recursosBack = perfil.Recursos ? perfil.Recursos.map((r) => r.dataValues) : [];
    const recursosFron = this.recursos || [];
    if (recursosBack.length === 0 && recursosFron.length === 0) {
      return this.findByUUId(perfil.UUId);
    }
    const listas = await util.montarListasExclusaoInclusao(recursosFron, recursosBack);
    if (listas.listaIncluir.length !== 0) {
      const litaIncluir = listas.listaIncluir.map((rec) => ({
        RecursoId: rec.id, PerfilId: perfil.id,
      }));
      await RecursoPerfil.bulkCreate(litaIncluir);
    }
    if (listas.listaExcluir.length !== 0) {
      const litaExcluir = listas.listaExcluir.map((rec) => rec.id);
      await RecursoPerfil.destroy({
        where: {
          PerfilId: perfil.id, RecursoId: litaExcluir,
        },
      });
    }
    return this.findByUUId(perfil.UUId);
  }
}

module.exports = new PerfilRepository();
