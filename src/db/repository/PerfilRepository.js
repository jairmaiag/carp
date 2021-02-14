const { Perfil, RecursoPerfil } = require('../models');
const util = require('../../app/util/Util');

const include = { association: 'Recursos', through: { attributes: [] } };

class PerfilRepository {
  static async findAll(attributes, filter, order) {
    const result = await Perfil.findAll({
      attributes,
      where: filter,
      limit: filter ? null : 10,
      order: order || [['id', 'ASC']],
      raw: false,
    });
    return result;
  }

  static async findAndPaginate(attributes, filter, order, page) {
    const result = await Perfil.findAndPaginate(
      attributes,
      filter,
      order,
      page,
    );
    return result;
  }

  static async findById(id) {
    return Perfil.findByPk(id, include);
  }

  static async findByUUId(UUId) {
    return Perfil.findOne({
      where: {
        UUId,
      },
      include,
    });
  }

  static async insert(dados) {
    const perfil = await Perfil.create(dados);
    return this.manutencaoRecursos(dados.Recursos || [], perfil);
  }

  static async update(dados) {
    const result = await Perfil.update(dados, {
      where: {
        UUId: dados.UUId,
      },
    });
    if (result[0] === 1) {
      const perfil = await this.findByUUId(dados.UUId);
      return this.manutencaoRecursos(dados.Recursos, perfil);
    }
    return null;
  }

  static async delete(UUId) {
    return Perfil.destroy({
      where: {
        UUId,
      },
    });
  }

  static async manutencaoRecursos(dados, perfil) {
    const recursosBack = perfil.Recursos ? perfil.Recursos.map((r) => r.dataValues) : [];
    const recursosFron = dados || [];
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

module.exports = function repository() { return PerfilRepository; };
