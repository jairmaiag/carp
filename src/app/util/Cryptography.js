const CryptoJS = require("crypto-js");
class Cryptography {
    constructor() {
        this.SEGREDO = 'artemisgostadevoar';
    }
    cryptor(word) {
        return CryptoJS.SHA3(word).toString();
    }
}
module.exports = new Cryptography();