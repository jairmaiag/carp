const ServerError = require('../../errors/ServerError');
const UnauthorizedError = require('../../errors/UnauthorizedError');
const ReturnRequest = require('./ReturnRequest');
const util = require('../../util/Util');

class httpHelpers {
  ok(data) {
    if (!(data instanceof Object)) {
      data = util.montarMensagemJson(data);
    }
    return new ReturnRequest(200, data).getInstance();
  }

  noContent() {
    return new ReturnRequest(204).getInstance();
  }

  badRequest(error) {
    return new ReturnRequest(400, error).getInstance();
  }

  unauthorized() {
    return new ReturnRequest(401, new UnauthorizedError()).getInstance();
  }

  forbidden(error) {
    return new ReturnRequest(403, error).getInstance();
  }

  notFound(error) {
    return new ReturnRequest(404, error).getInstance();
  }

  serverError(error) {
    return new ReturnRequest(500, new ServerError(error.stack)).getInstance();
  }
}

module.exports = new httpHelpers();
