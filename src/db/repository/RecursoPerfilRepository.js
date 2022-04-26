const { RecursoPerfil } = require('../models');
const BaseRepository = require('../abstract/BaseRepository');

class RecursoPerfilRepository extends BaseRepository {
    constructor() {
      super(RecursoPerfil ,[]);
    }
}

module.exports = new RecursoPerfilRepository();