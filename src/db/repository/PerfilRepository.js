const { Perfil, Usuario } = require("../models")

const PerfilRepository = function () { }

PerfilRepository.prototype.findAll = async function (attributes, filter, order) {
  const result = await Perfil.findAll({
    attributes: attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [["id", "ASC"]],
    raw: true,
  })
  return result
}
PerfilRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  page = await Perfil.findAndPaginate(
    attributes,
    filter,
    order,
    page,
  )
  return page
}
PerfilRepository.prototype.findById = async function (id) {
  return await Perfil.findByPk(id);
}
PerfilRepository.prototype.findByUUId = async function (UUId) {
  return await Perfil.findOne({ where: { UUId: UUId } });
}

PerfilRepository.prototype.insert = async function (dados) {
  return await Perfil.create(dados);
}

PerfilRepository.prototype.update = async function (dados) {
  const result = await Perfil.update(dados, { where: { UUId: dados.UUId } })
  return result[0] === 1 ? await this.findByUUId(dados.UUId) : null
}

PerfilRepository.prototype.delete = async function (UUId) {
  return await Perfil.destroy({ where: { UUId: UUId }, });
}

module.exports = new PerfilRepository()
