const { v4: uuidv4 } = require('uuid')
const { serverError } = require('../helpers/http/HttpHelpers')

class UUIDGenerator {
  getUUIDV4() {
    try {
      return uuidv4()
    } catch (error) {
      return serverError(error)
    }
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
