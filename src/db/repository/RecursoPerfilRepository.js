const AbstractRepository = require('../abstract/AbstractRepository');
const { RecursoPerfil } = require('../models');

class RecursoPerfilRepository extends AbstractRepository {
    constructor() {
      super(RecursoPerfil ,[]);
    }
}

module.exports = new RecursoPerfilRepository();