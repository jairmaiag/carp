const CheckFilterMiddleware = require('./CheckFilterMiddleware');
const adaptMiddleware = require('../adapters/express/ExpressMiddlewareAdapter');

const checkFilter = adaptMiddleware(new CheckFilterMiddleware());

module.exports = checkFilter;
