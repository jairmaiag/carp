const checkIdMiddleware = require('./CheckIdMiddleware');
const adaptMiddleware = require('../adapters/express/ExpressMiddlewareAdapter');

const checkId = adaptMiddleware(new checkIdMiddleware());

module.exports = checkId;
