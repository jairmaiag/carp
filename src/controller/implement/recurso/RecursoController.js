const repository = require('../../../db/repository/RecursoRepository');
const AbstractController = require('../../abstract/AbstractController');

class RecursoController extends AbstractController {
  constructor(app) {
    super(app, repository);
  }
}
module.exports = () => RecursoController;