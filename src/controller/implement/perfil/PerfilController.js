const repository   = require('../../../db/repository/PerfilRepository');
const AbstractController = require('../../abstract/AbstractController');
const RecursoRepository = require('../../../db/repository/RecursoRepository');
const RecursoPerfilRepository = require('../../../db/repository/RecursoPerfilRepository');
const RecursoController = require('../recurso/RecursoController')();


class PerfilController extends AbstractController {
  constructor() {
    super(repository);
  }
  async insert(req) {
    const recursos = req.body.recursos.map(u=> u.UUId);
    // console.log(recursos);
    // console.log(super.repository);
    const recurosBanco = await RecursoRepository.findIdsByUUIds(recursos);
    recurosBanco.forEach(r => {
      // console.log(r.id);
      
    });
    // console.log(super.montarOk(recurosBanco));

    const insert = await super.insert(req);
    if(insert.statusCode === 200 && recursos){
      console.log(insert);
    }
    return insert;
  }
}
module.exports = () => PerfilController;
