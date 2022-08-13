const AbstractRepository = require('../abstract/AbstractRepository');
const RecursoRepository = require('./RecursoRepository');
const PerfilRepository = require('./PerfilRepository');
const { RecursoPerfil } = require('../models');

class RecursoPerfilRepository extends AbstractRepository {
  constructor() {
    super(RecursoPerfil, []);
  }

  async update(dados) {
    /**
     * Este método deverá fazar a inclusão de novos recuros, vindo do front-end.
     * Remover os excluidos do front-end.
     * O parâmetro passado, dever conter dois arrays, um para inclusão e outro para exclusão.
     if (dados.listaIncluir.length !== 0) {
       const litaIncluir = dados.listaIncluir.map(rec => ({ RecursoId: rec.id, PerfilId: perfil.id }));
       await this.bulkCreate(litaIncluir);
      }
      if (dados.listaExcluir.length !== 0) {
        dados.listaExcluir.forEach(rec => {
          await RecursoPerfil.destroy({ RecursoId: rec.id, PerfilId: perfil.id });
        });
      }
      */

    return dados;
  }

  async beforeDelete(filter) {
    return filter;
  }

  async delete(filter) {
    // const filter = { "RecursoId": idRecurso, "PerfilId": idPerfil };
    return this.model.destroy({ where: filter });
  }

  async deleteByPerfilId(filter) {
    return this.model.destroy({ where: { filter } });
  }
}

module.exports = new RecursoPerfilRepository();