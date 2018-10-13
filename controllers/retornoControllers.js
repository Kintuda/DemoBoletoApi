module.exports.processarRetorno = async (req, res, next) => {
  let arquivoRetorno = req.body.entradaTexto
  var options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/retornos',
    headers:
    {
      'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113'
    },
    body: { 'arquivo': arquivoRetorno },
    json: true
  }
  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
  })
}
module.exports.getRetorno = async (req, res, next) => {
  let protRetorno = req.body.protRetorno
  let options = {
    method: 'POST',
    url: `http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/retornos/${protRetorno}`,
    json: true,
    headers:
    {
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113'
    }
  }
  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', { dados: retorno })
  })
}
