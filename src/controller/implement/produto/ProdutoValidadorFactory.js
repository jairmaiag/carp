const ValidacaoComposite = require('../../../app/validators/ValidacaoComposite')
const CampoObrigatorioValidador = require('../../../app/validators/CampoObrigatorioValidador')

const produtoValidador = () => {
  const validadores = []
  
  for (const campo of ['codigo', 'nome']) {
    validadores.push(new CampoObrigatorioValidador(campo))
  }

  return new ValidacaoComposite(validadores)
}

module.exports = produtoValidador()