const repository = require('../../../db/repository/RecursoRepository');
const AbstractController = require('../../abstract/AbstractController');

class RecursoController extends AbstractController {
  constructor() {
    super(repository);
  }
}
module.exports = () => RecursoController;