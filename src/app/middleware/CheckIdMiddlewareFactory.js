const CheckIdMiddleware = require('./CheckIdMiddleware');
const adaptMiddleware = require('../adapters/express/ExpressMiddlewareAdapter');

const checkId = adaptMiddleware(new CheckIdMiddleware());

module.exports = checkId;
