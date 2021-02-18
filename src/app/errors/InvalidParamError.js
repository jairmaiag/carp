class InvalidParamError {
  constructor(paramName) {
    this.error = `Invalid parameter: ${paramName}`;
    this.name = 'InvalidParamError';
  }
}

module.exports = InvalidParamError;
