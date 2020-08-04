const adaptRoute = require('../adapters/express/ExpressRouteAdapter')

module.exports = function (app) {
  app.get('/:model/', adaptRoute(app))
  app.get('/:model/paginacao', adaptRoute(app))
  app.get('/:model/UUId/:UUId', adaptRoute(app))
  app.get('/:model/:id', adaptRoute(app))
  app.post('/:model/', adaptRoute(app))
  app.put('/:model/', adaptRoute(app))
  app.delete('/:model/UUId/:UUId', adaptRoute(app))
  app.delete('/:model/:id', adaptRoute(app))
}
