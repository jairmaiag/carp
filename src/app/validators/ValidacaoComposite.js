class ValidacaoComposite {
  constructor (validadores) {
    this.validadores = validadores
  }

  valida (dadosEntrada) {
    for (const validador of this.validadores) {
      const error = validador.valida(dadosEntrada)
      if (error) {
        return error
      }
    }
  }
}

module.exports = ValidacaoComposite
