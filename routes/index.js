const express = require('express')
const router = express.Router()
const request = require("request")
const fs = require('fs')
router.get('/', (req, res, next) => {
  res.render('index', {
    title: "Demonstração boleto"
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
      if (error){
        throw new Error(error)
      }
      let situacao = body._dados[0].situacao
      let retorno = JSON.stringify(body, null, 2)
      let id = body._dados[0].idintegracao
      res.render('index', {
        frase : "Situação do boleto: ",
        error : situacao,
        dados : retorno
      })
    });
  } else {
    res.render('index', {
      erro: "Campo id Integração está vazio"
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
    let retorno  = JSON.stringify(body, null, 2)
    let status   = body._status
    res.render('index', {
      dados: retorno,
      error: status,
    })
  });
})
//Rota consultar impressao e imprimir boleto
router.post('/protImpressao', (req, res, next) => {
  let protocoloImpresssao = req.body.protEmail
  let options = {
    method: 'GET',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/impressao/lote/' + protocoloImpresssao,
    json: true,
    encoding: null,
    headers: {
      'cpf-cedente': '11361429917',
      'cnpj-sh': '01001001000113',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa'
    }
  }

  request(options, function (error, response, body) {
    if (error){
      throw new Error(error)
    }
    console.log(body)
    let dados = JSON.stringify(body, null, 2)
    /*fs.writeFileSync('pdf1234.pdf',body,(err)=>{
      if(err) throw err
    });*/
    fs.writeFile('pdftestetripla.pdf', body, (err) => {
      if (err){
        throw error;
      }
    })
    res.render('index', {
      dados: dados,
      frase: "Situação da impressão: ",
      error: "Salvado no computador "
    })
  })
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
      frase: "Status: ",
      error: body._status + ' ' + body._mensagem,
      dados: retorno
    })
  });
})
//Rota para realizar a remessa
router.post('/remessa', (req, res, next) => {
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
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
    console.log(body);
  });

})
//Descartar boleto
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
//Remessa de retorno
router.post('/retorno', (req, res, next) => {
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
    body: { "arquivo": arquivoRetorno },
    json: true
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
  })
})
//Realizar baixa do boleto
router.post('/baixa', (req, res, next) => {
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
    body: [ idIntegracao ],
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', { dados: retorno })
    console.log(body);
  });
})
//Consulta da alteração da remessa
router.post('/remessaAlteracao',(req,res,next)=>{
  let pro
})
//Consulta do retorno do banco
router.post('/protRetorno', (req, res, next) => {
  let protRetorno = req.body.protRetorno
  let options = {
    method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/retornos/' + protRetorno,
    json: true,
    headers:
      {
        'cpf-cedente': '11361429917',
        'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
        'cnpj-sh': '01001001000113'
      },
  }
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', { dados: retorno })
  });
})
//Rota para consultar baixa no sistema
router.post('/baixa', (req, resp, next) => {
  let protBaixa = req.body.protBaixa
  let options = {
    method: 'GET',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/baixa/lote/H1lyLcdV4WZ' + protBaixa,
    headers:
      {
        'cpf-cedente': '11361429917',
        'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
        'cnpj-sh': '01001001000113'
      },
    body: '\r\n  ["IdIntegracao1", "IdIntegracao2","IdIntegracao3"]\r\n'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body, null, 2)
    res.render('index', {
      dados: retorno
    })
    console.log(body);
  });
})
//Emitir alteração
router.post('/alteracao',(req,res,next)=>{
  let mudanca = JSON.parse(req.body.entradaTexto)

  var options = { method: 'POST',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/altera/lote',
    headers: 
    { 'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113' },
    body: mudanca,
    json: true };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body,null,2)
    res.render('index',{
      dados:retorno
    })
  });
})
//Consultar alteração
router.post('/protAlteracao',(req,res,next)=>{
  let protAlteracao = req.body.protAlteracao
  let options = { method: 'GET',
    url: 'http://homologacao.cobrancabancaria.tecnospeed.com.br:8080/api/v1/boletos/altera/lote/'+protAlteracao,
    json:true,
    headers: 
    { 'Content-Type': 'application/json',
      'cpf-cedente': '11361429917',
      'token-sh': 'f22b97c0c9a3d41ac0a3875aba69e5aa',
      'cnpj-sh': '01001001000113' }}
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let retorno = JSON.stringify(body,null,2)
    res.render('index',{
      dados:retorno
    })
  });

})
module.exports = router;
