const express = require('express')
const router = express.Router()

const boletoControllers = require('../controllers/boletoControllers')
const impressaoControlllers = require('../controllers/impressaoControllers')
const emailControllers = require('../controllers/emailControllers')
const remessaControllers = require('../controllers/remessaControllers')
const retornoControllers = require('../controllers/retornoControllers')
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Demonstração boleto'
  })
})
// Gerar Header da chamada do API
router.post('/', (req, res, next) => {
  global.cnpjSh = req.body.cnpjsoftwarehouse
  global.tokenSoftware = req.body.softwarehousetoken
  global.cnpjCedente = req.body.cnpjCedente
  res.redirect('/')
})
router.post('/idIntegracao', boletoControllers.getBoleto)
router.post('/impressao', impressaoControlllers.postImpressao)
router.post('/email', emailControllers.postEmail)
router.post('/protEmail', emailControllers.getEmail)
router.post('/protImpressao', impressaoControlllers.getImpressao)
router.post('/boleto', boletoControllers.incluirBoleto)
router.post('/remessa', remessaControllers.gerarRemessa)
router.post('/descartar', boletoControllers.descartar)
router.post('/retorno', retornoControllers.processarRetorno)
router.post('/baixa', remessaControllers.gerarBaixa)
router.post('/protRetorno', retornoControllers.getRetorno)
router.post('/baixa', remessaControllers.getBaixa)
router.post('/alteracao', remessaControllers.gerarAlteracao)
router.post('/protAlteracao', remessaControllers.getAlteracao)
router.get('*/', (req, res, next) => {
  res.redirect('/')
})
router.post('*/', (req, res, next) => {
  res.redirect('/')
})

module.exports = router
