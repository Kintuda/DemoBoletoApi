const express = require('express')
const router = express.Router()
const request = require("request")
router.get('/', (req, res, next) => {
  res.render('index', {
    title: "Teste"
  })
})
//Gerar Header da chamada do API
router.post('/', (req, res, next) => {
  var cnpjSoftware = req.body.cnpjsoftwarehouse
  var tokenSoftware = req.body.softwarehousetoken
  var cnpjCedente = req.body.cnpjcedente
  res.redirect('/')
})
//Consultar a situação do boleto pelo id de integração
router.post('/idIntegracao', (req, res, next) => {
  let idIntegracao = req.body.idIntegracao
  console.log(idIntegracao);
  if (idIntegracao != '') {
    var options = {
      method: 'GET',
      url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos',
      qs: {
        idIntegracao: idIntegracao
      },
      json: true,
      headers: {
        'cpf-cedente': "11361429917",
        'token-sh': "f22b97c0c9a3d41ac0a3875aba69e5aa",
        'cnpj-sh': "01001001000113"
      },
    };
    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      let retorno = JSON.stringify(body, null, 2)
      res.render('index', {
        dados: retorno
      })
    });
  } else {
    res.render('index', {
      dados: "Campo id Integração está vazio"

    })
  }
});
//Rota para emitir a impressão do boleto
router.post('/impressao', (req, res, next) => {
  let impressao = JSON.parse(req.body.entradaTexto)
  console.log(impressao)
  let options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/impressao/lote',
    headers: {
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    },
    body: impressao,
    json:true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
  });
})
//Incluir email
router.post('/email', (req, res, next) => {
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

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
  });
})
//Rota consultar email
router.post('/protEmail', (req, res, next) => {
  let protocoloEmail = req.body.protEmail

  let options = {
    method: 'GET',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/email/lote/' + protocoloEmail,
    json: true,
    headers: {
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
  });

})
//Rota consultar impressao
router.post('/protImpressao',(req,res,next)=>{
  let protocoloImpresssao = req.body.protEmail
  let options = {
    method: 'GET',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/impressao/lote/' + protocoloImpresssao,
    json: true,
    headers: {
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
  });
})
//Rota incluir boleto
router.post('/boleto', (req, res, next) => {
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
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2);
    res.render('index', {
      dados: retorno
    })
  });
})
//Rota para descartar boleto
router.post('/descartar', (req, res, next) => {
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
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2);
    res.render('index', {
      dados: retorno
    })
  });

})
module.exports = router;