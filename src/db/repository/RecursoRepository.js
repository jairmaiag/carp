const AbstractRepository = require('../abstract/AbstractRepository');
const DbUtil = require('../DbUtil');
const { Recurso } = require('../models');

class RecursoRepository extends AbstractRepository {
  constructor() {
    super(Recurso, [DbUtil.getIncludePerfis()]);
  }
}

module.exports = new RecursoRepository();
