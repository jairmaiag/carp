const checkFilterMiddleware = require('./CheckFilterMiddleware')
const adaptMiddleware = require('../adapters/express/ExpressMiddlewareAdapter')

const checkFilter = adaptMiddleware(new checkFilterMiddleware())

module.exports = checkFilter
