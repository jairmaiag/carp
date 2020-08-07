const adaptRoute = require('../adapters/express/ExpressRouteAdapter')
const checkUUId = require('../middleware/CheckUUIdMiddlewareFactory')
const checkId = require('../middleware/CheckIdMiddlewareFactory')
const checkFilter = require('../middleware/CheckFilterMiddlewareFactory')

module.exports = function (app) {
  app.get('/:model/', checkFilter, adaptRoute(app))
  app.get('/:model/paginacao', adaptRoute(app))
  app.get('/:model/UUId/:UUId', checkUUId, adaptRoute(app))
  app.get('/:model/:id', checkId, adaptRoute(app))
  
  app.post('/:model/', checkUUId, adaptRoute(app))

  app.put('/:model/', checkUUId, adaptRoute(app))

  app.delete('/:model/UUId/:UUId', checkUUId, adaptRoute(app))

  // Delete por ID provavelmente não vai existir
  // app.delete('/:model/:id', checkId, adaptRoute(app))
}
