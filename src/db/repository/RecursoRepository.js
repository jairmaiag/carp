const { Recurso, Perfil } = require("../models")

const RecursoRepository = function () { }
const include = { association: 'Perfis', through: { attributes: [] } };

RecursoRepository.prototype.findAll = async function (attributes, filter, order) {
  const result = await Recurso.findAll({
    attributes: attributes,
    where: filter,
    limit: filter ? null : 10,
    order: order || [["id", "ASC"]],
    raw: true,
  })
  return result
}
RecursoRepository.prototype.findAndPaginate = async function (attributes, filter, order, page) {
  page = await Recurso.findAndPaginate(
    attributes,
    filter,
    order,
    page,
  )
  return page
}
RecursoRepository.prototype.findById = async function (id) {
  return await Recurso.findByPk(id);
}
RecursoRepository.prototype.findByUUId = async function (UUId) {
  return await Recurso.findOne({ where: { UUId: UUId }, include });
}

RecursoRepository.prototype.insert = async function (dados) {
  return await Recurso.create(dados);
}

RecursoRepository.prototype.update = async function (dados) {
  const result = await Recurso.update(dados, { where: { UUId: dados.UUId } })
  return result[0] === 1 ? await this.findByUUId(dados.UUId) : null
}

RecursoRepository.prototype.delete = async function (UUId) {
  return await Recurso.destroy({ where: { UUId: UUId }, });
}

module.exports = new RecursoRepository()
