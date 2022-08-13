const jwt = require('jsonwebtoken');
const forJWT = (req, res) => {
  const token = req.headers['x-access-token'];

  if (token === undefined) {
    res.status(401).json({ mensagem: `${req.i18n_texts.user_not_logged_in} ${req.i18n_texts.please_do_login}` });
    return null;
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.status(500).json({ auth: false, mensagem: `${req.i18n_texts.user_not_logged_in} ${req.i18n_texts.please_do_login}` });
    }

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    return req;
  });
}

const forSession = (req, res) => {
  if (req.session.usuario === undefined) {
    res.status(401).json({ mensagem: `${req.i18n_texts.user_not_logged_in} ${req.i18n_texts.please_do_login}` });
  }
  return res;
}

const CheckLoginMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    const { originalUrl } = req;
    if (originalUrl === '/' || originalUrl === '/login') {
      return next();
    }
    // req = forJWT(req, res);
    req = forSession(req, res)
  }
  next();
};

module.exports = CheckLoginMiddleware;
