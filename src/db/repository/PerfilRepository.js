const { Perfil, Recurso, RecursoPerfil } = require("../models")

const PerfilRepository = function () { }
const include = { association: 'Recursos',through: {attributes: [] } };

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
  return await Perfil.findByPk(id,include);
}
PerfilRepository.prototype.findByUUId = async function (UUId) {
  let perfis = await this.findAll({},{ UUId: UUId });
  return perfis.length === 0? null: perfis[0];
}

PerfilRepository.prototype.insert = async function (dados) {
  let perfil = await Perfil.create(dados);
  await this.insertRecursos(dados.Recursos, perfil);
  return perfil;
}

PerfilRepository.prototype.update = async function (dados) {
  const result = await Perfil.update(dados, { where: { UUId: dados.UUId } })
  if (result[0] === 1) {
    let perfil = await this.findByUUId(dados.UUId);
    await this.insertRecursos(dados.Recursos, perfil);
    return perfil;
  } else {
    return null;
  }
}

PerfilRepository.prototype.delete = async function (UUId) {
  return await Perfil.destroy({ where: { UUId: UUId }, });
}

PerfilRepository.prototype.insertRecursos = async function (dados, perfil) {
  if (dados && dados.length > 0) {
    for (let i = 0; i < dados.length; i++) {
      let recursoModel = await Recurso.findOne({ where: { UUId: dados[i].UUId } });
      if (recursoModel) {
        await perfil.reload();
        await perfil.addRecursos(recursoModel);
      }
    }
  }
}

module.exports = new PerfilRepository();
