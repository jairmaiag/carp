const { v4: uuidv4 } = require('uuid')

class UUIDGenerator {
  getUUIDV4() {
    return uuidv4()
  }
}

module.exports = new UUIDGenerator()

// Outra forma de exportar. 
// Usando: const UUIDGenerator = require('../usecase/UUIDGenerator.js')
// UUIDGenerator.getUUIDV4()
//
// module.exports.getUUIDV4 = function() {
//   return uuidv4()
// }
