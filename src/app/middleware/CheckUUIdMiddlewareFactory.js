const CheckUUIdMiddleware = require('./CheckUUIdMiddleware');
const adaptMiddleware = require('../adapters/express/ExpressMiddlewareAdapter');

const checkUUId = adaptMiddleware(new CheckUUIdMiddleware());

module.exports = checkUUId;
