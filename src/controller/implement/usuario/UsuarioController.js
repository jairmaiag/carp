const repository = require('../../../db/repository/UsuarioRepository');
const AbstractController = require('../../abstract/AbstractController');

class UsuarioController extends AbstractController {
  constructor() {
    super(repository);
  }
}
module.exports = () => UsuarioController;
