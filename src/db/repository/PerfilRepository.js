const { Perfil, Recurso, RecursoPerfil } = require('../models');
const util = require('../../app/util/Util');

const PerfilRepository = function () { };
const include = { association: 'Recursos', through: { attributes: [] } };

PerfilRepository.prototype.findAll = async function (attributes, filter, order) {
  const result = await Perfil.findAll({
    attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [['id', 'ASC']],
    raw: false,
  });
  return result;
};
PerfilRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  page = await Perfil.findAndPaginate(
    attributes,
    filter,
    order,
    page,
  );
  return page;
};

PerfilRepository.prototype.findById = async function (id) {
  return await Perfil.findByPk(id, include);
};

PerfilRepository.prototype.findByUUId = async function (UUId) {
  return Perfil.findOne({ where: { UUId }, include });
};

PerfilRepository.prototype.insert = async function (dados) {
  const perfil = await Perfil.create(dados);
  return await this.manutencaoRecursos(dados.Recursos || [], perfil);
};

PerfilRepository.prototype.update = async function (dados) {
  const result = await Perfil.update(dados, { where: { UUId: dados.UUId } });
  if (result[0] === 1) {
    const perfil = await this.findByUUId(dados.UUId);
    return await this.manutencaoRecursos(dados.Recursos, perfil);
  }
  return null;
};

PerfilRepository.prototype.delete = async function (UUId) {
  return await Perfil.destroy({ where: { UUId } });
};

PerfilRepository.prototype.manutencaoRecursos = async function (dados, perfil) {
  const recursosBack = perfil.Recursos ? perfil.Recursos.map((r) => r.dataValues) : [];
  const recursosFron = dados || [];
  if (recursosBack.length === 0 && recursosFron.length === 0) {
    return await this.findByUUId(perfil.UUId);
  }
  const listas = await util.montarListasExclusaoInclusao(recursosFron, recursosBack);
  if (listas.listaIncluir.length !== 0) {
    const litaIncluir = listas.listaIncluir.map((rec) => ({ RecursoId: rec.id, PerfilId: perfil.id }));
    await RecursoPerfil.bulkCreate(litaIncluir);
  }
  if (listas.listaExcluir.length !== 0) {
    const litaExcluir = listas.listaExcluir.map((rec) => rec.id);
    await RecursoPerfil.destroy({ where: { PerfilId: perfil.id, RecursoId: litaExcluir } });
  }
  return await this.findByUUId(perfil.UUId);
};

module.exports = new PerfilRepository();
