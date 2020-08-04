const MissingParamError = require('../errors/MissingParamError')

class CampoObrigatorioValidador {
  constructor (nomeCampo) {
    this.nomeCampo = nomeCampo
  }

  valida (dadosEntrada) {
    if (!dadosEntrada[this.nomeCampo]) {
      return new MissingParamError(this.nomeCampo)
    }
  }
}

module.exports = CampoObrigatorioValidador
