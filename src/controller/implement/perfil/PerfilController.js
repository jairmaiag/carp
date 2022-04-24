const repository = require('../../../db/repository/PerfilRepository')();
const AbstractController = require('../../abstract/AbstractController');

class PerfilController extends AbstractController {
  constructor() {
    super(repository);
  }
}
module.exports = () => PerfilController;
