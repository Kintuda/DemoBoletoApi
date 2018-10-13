const request = require('request')

module.exports.getBoleto = async (req, res, next) => {
  let idIntegracao = req.body.idIntegracao
  if (idIntegracao != '') {
    let options = {
      method: 'GET',
      url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos',
      qs: {
        idIntegracao: idIntegracao
      },
      json: true,
      varheaders: {
        'cpf-cedente': '11361429917',
        'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
        'cnpj-sh': '01001001000113'
      }
    }
    request(options, (error, response, body) => {
      if (error) {
        throw new Error(error)
      }
      let situacao = body._dados[0].situacao
      let retorno = JSON.stringify(body, null, 2)
      let id = body._dados[0].idintegracao
      res.render('index', {
        frase: 'Situação do boleto: ',
        error: situacao,
        dados: retorno
      })
    })
  } else {
    res.render('index', {
      erro: 'Campo id Integração está vazio'
    })
  }
}

module.exports.incluirBoleto = async (req, res, next) => {
  let jsonBoleto = JSON.parse(req.body.entradaTexto)
  let options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/lote',
    headers: {
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113'
    },
    body: jsonBoleto,
    json: true
  }
  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      frase: 'Status: ',
      error: body._status + ' ' + body._mensagem,
      dados: retorno
    })
  })
}

module.exports.descartar = async (req, res, next) => {
  let idIntegracao = req.body.idIntegracao
  let options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/descarta/lote',
    headers: {
      'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    },
    body: [idIntegracao],
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
