const BaseRepository = require('../abstract/BaseRepository');
const DbUtil = require('../DbUtil');
const { Recurso } = require('../models');

class RecursoRepository extends BaseRepository {
  constructor() {
    super(Recurso, [DbUtil.getIncludePerfis()]);
  }
}

module.exports = () => RecursoRepository;
