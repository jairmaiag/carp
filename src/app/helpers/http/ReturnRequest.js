module.exports = class ReturnRequest {
    constructor(statusCode, body) {
        this.statusCode = statusCode;
        this.body = body ? body : null;
    }
    getInstance() {
        return this;
    }
}
  