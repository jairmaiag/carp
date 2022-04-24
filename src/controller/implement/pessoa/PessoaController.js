const repository = require('../../../db/repository/PessoaRepository')();
const AbstractController = require('../../abstract/AbstractController');

class PessoaController extends AbstractController {
  constructor() {
    super(repository);
  }
}
module.exports = () => PessoaController;