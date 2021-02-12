const { Perfil, Recurso, RecursoPerfil } = require("../models")
const util = require('../../app/util/Util')

const PerfilRepository = function () { }
const include = { association: 'Recursos', through: { attributes: [] } };

PerfilRepository.prototype.findAll = async function (attributes, filter, order) {
  const result = await Perfil.findAll({
    attributes: attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [["id", "ASC"]],
    raw: false,
    include
  })
  return result
}
PerfilRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  page = await Perfil.findAndPaginate(
    attributes,
    filter,
    order,
    page
  )
  return page
}

PerfilRepository.prototype.findById = async function (id) {
  return await Perfil.findByPk(id, include);
}

PerfilRepository.prototype.findByUUId = async function (UUId) {
  return Perfil.findOne({ where: { UUId: UUId }, include });
}

PerfilRepository.prototype.insert = async function (dados) {
  let perfil = await Perfil.create(dados);
  return await this.manutencaoRecursos(dados.Recursos, perfil);
}

PerfilRepository.prototype.update = async function (dados) {
  const result = await Perfil.update(dados, { where: { UUId: dados.UUId } })
  if (result[0] === 1) {
    let perfil = await this.findByUUId(dados.UUId);
    return await this.manutencaoRecursos(dados.Recursos, perfil);
  } else {
    return null;
  }
}

PerfilRepository.prototype.delete = async function (UUId) {
  return await Perfil.destroy({ where: { UUId: UUId }, });
}

PerfilRepository.prototype.manutencaoRecursos = async function (dados, perfil) {
  let recursosBack = perfil.Recursos ? perfil.Recursos.map(r => r.dataValues) : [];
  let listas = await util.montarListasExclusaoInclusao(dados, recursosBack);
  if (listas.listaIncluir.length !== 0) {
    let litaIncluir = listas.listaIncluir.map(rec => { return { RecursoId: rec.id, PerfilId: perfil.id } });
    await RecursoPerfil.bulkCreate(litaIncluir);
  }
  if (listas.listaExcluir.length !== 0) {
    let litaExcluir = listas.listaExcluir.map(rec => rec.id);
    await RecursoPerfil.destroy({ where: { PerfilId: perfil.id, RecursoId: litaExcluir } });
  }
  return await this.findByUUId(perfil.UUId);
}

module.exports = new PerfilRepository();
