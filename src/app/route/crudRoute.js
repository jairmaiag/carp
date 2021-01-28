const adaptRoute = require('../adapters/express/ExpressRouteAdapter')
const checkUUId = require('../middleware/CheckUUIdMiddlewareFactory')
const checkId = require('../middleware/CheckIdMiddlewareFactory')
const checkFilter = require('../middleware/CheckFilterMiddlewareFactory')
const checkLogin = require('../middleware/CheckLoginMiddleware')

module.exports = function (app) {
  app.get('/:model/', checkLogin, checkFilter, adaptRoute(app))
  app.get('/:model/paginacao', checkLogin, adaptRoute(app))
  app.get('/:model/UUId/:UUId',checkLogin, checkUUId, adaptRoute(app))
  app.get('/:model/:id',checkLogin, checkId, adaptRoute(app))
  
  app.post('/:model/',checkLogin, checkUUId, adaptRoute(app))

  app.put('/:model/',checkLogin, checkUUId, adaptRoute(app))

  app.delete('/:model/UUId/:UUId',checkLogin, checkUUId, adaptRoute(app))

  // Delete por ID provavelmente não vai existir
  // app.delete('/:model/:id', checkId, adaptRoute(app))
}
