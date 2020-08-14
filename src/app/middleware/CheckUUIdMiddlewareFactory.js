const checkUUIdMiddleware = require('./CheckUUIdMiddleware')
const adaptMiddleware = require('../adapters/express/ExpressMiddlewareAdapter')

const checkUUId = adaptMiddleware(new checkUUIdMiddleware())

module.exports = checkUUId
