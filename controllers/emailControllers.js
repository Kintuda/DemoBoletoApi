module.exports.postEmail = async (req, res, next) => {
  let emailjson = JSON.parse(req.body.entradaTexto)
  let options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/email/lote',
    headers: {
      'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    },
    body: emailjson,
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
module.exports.getEmail = async (req, res, next) => {
  let protocoloEmail = req.body.protEmail
  let options = {
    method: 'GET',
    url: `http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/email/lote/${protocoloEmail}`,
    json: true,
    headers: {
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    }
  }

  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    let retorno = JSON.stringify(body, null, 2)
    let status = body._status
    res.render('index', {
      dados: retorno,
      error: status
    })
  })
}
