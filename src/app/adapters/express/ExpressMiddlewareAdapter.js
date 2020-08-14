module.exports = function (middleware) {
  return async (req, res, next) => {

    const httpResponse = await middleware.execute(req)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {

      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  }
}
