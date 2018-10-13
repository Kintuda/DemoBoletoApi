module.exports.postImpressao = async (req, res, next) => {
  let impressao = JSON.parse(req.body.entradaTexto)
  let options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/impressao/lote',
    headers: {
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    },
    body: impressao,
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
module.exports.getImpressao = async (req, res, next) => {
  let protocoloImpresssao = req.body.protEmail
  let options = {
    method: 'GET',
    url: `http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/impressao/lote/${protocoloImpresssao}`,
    json: true,
    encoding: null,
    headers: {
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    }
  }

  request(options, (error, response, body) => {
    if (error) {
      throw new Error(error)
    }
    fs.writeFile('pdftestetripla.pdf', body, (err) => {
      if (err) {
        throw error
      }
    })
    res.render('index', {
      dados: dados,
      frase: 'Situação da impressão: ',
      error: 'Salvado no computador '
    })
  })
}
