const { v4: uuidv4 } = require('uuid');

class UUIDGenerator {
  getUUIDV4() {
    return uuidv4();
  }
}

module.exports = new UUIDGenerator();