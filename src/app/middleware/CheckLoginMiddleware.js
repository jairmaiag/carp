CheckLoginMiddleware = (req, res, next) =>{
    if (process.env.NODE_ENV === 'production') {
        let urlOrigem = req.originalUrl
        if (urlOrigem === '/' || urlOrigem === '/login') {
          return next();
        }
        if (req.session.usuario === undefined) {
          res.status(401).json({mensagem: `${req.i18n_texts.user_not_logged_in} ${req.i18n_texts.please_do_login}`})
          return;
        }
      }
      next();
};

module.exports = CheckLoginMiddleware