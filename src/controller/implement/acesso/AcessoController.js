const jwt = require('jsonwebtoken');
const repository = require('../../../db/repository/UsuarioRepository');
const { serverError, badRequest, ok } = require('../../../app/helpers/http/HttpHelpers');

class AcessoController {

  constructor(app) {
    this.app = app
  }

  async login(req) {
    try {
      const filter = req.body
      if (!filter.login || !filter.senha) {
        return badRequest(`${req.i18n_texts.field_login_password_required} ${req.i18n_texts.please_try_again}`)
      }

      const entity = await repository.findByLoginSenha(filter);
      if (!entity) {
        return badRequest(`${req.i18n_texts.username_password_invalid} ${req.i18n_texts.please_try_again}`)
      }
      const UUId = entity.UUId;

      const token = jwt.sign({ UUId }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      entity.dataValues.auth=true;
      entity.dataValues.token=token;

      return ok(entity)
    } catch (error) {
      return serverError(error)
    }
  }

  async logout(req) {
    try {
      req.session.destroy();
      return ok(req.i18n_texts.user_logged_out);
    } catch (error) {
      return serverError(error);
    }
  }

  async alterarsenha(req) {
    try {
      if (!req.body.UUId) {
        return badRequest(`${req.i18n_texts.UUId_required}`);
      }
      if (!req.body.login || !req.body.senha) {
        return badRequest(`${req.i18n_texts.field_login_password_required}`);
      }
      if (!req.body.senhaAntiga) {
        return badRequest(`${req.i18n_texts.field_login_oldpassword_required}`);
      }
      const entity = await repository.update(req.body);
      return ok(entity)
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = () => AcessoController
