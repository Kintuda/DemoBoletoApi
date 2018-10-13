module.exports.gerarRemessa = async (req, res, next) => {
  let idIntegracao = req.body.idIntegracao
  let options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/remessas/lote',
    headers:
    {
      'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113'
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

module.exports.gerarBaixa = async (req, res, next) => {
  let idIntegracao = req.body.idIntegracao
  var options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/baixa/lote',
    headers:
    {
      'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113'
    },
    body: [idIntegracao],
    json: true
  }

  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', { dados: retorno })
  })
}

module.exports.getBaixa = async (req, res, next) => {
  let protBaixa = req.body.protBaixa
  let options = {
    method: 'GET',
    url: `http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/baixa/lote/${protBaixa}`,
    headers:
    {
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113'
    },
    body: '\r\n  ["IdIntegracao1", "IdIntegracao2","IdIntegracao3"]\r\n'
  }

  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
  })
}

module.exports.gerarAlteracao = async (req, res, next) => {
  let mudanca = JSON.parse(req.body.entradaTexto)

  var options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/altera/lote',
    headers:
    {
      'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113'
    },
    body: mudanca,
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
module.exports.getAlteracao = async (req, res, next) => {
  let protAlteracao = req.body.protAlteracao
  let options = {
    method: 'GET',
    url: `http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/altera/lote/${protAlteracao}`,
    json: true,
    headers:
    {
      'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113'
    }
  }
  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
  })
}
