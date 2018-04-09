const retorno = 
{
    "arquivo":"Arquivo Base64"
  }
  
const incluirBody = 
[
  {
    "CedenteContaNumero": "54321",
    "CedenteContaNumeroDV": "0",
    "CedenteConvenioNumero": "321",
    "CedenteContaCodigoBanco": "341",
    "SacadoCPFCNPJ": "28436161661",
    "SacadoEmail": "email@sacado.com",
    "SacadoEnderecoNumero": "987",
    "SacadoEnderecoBairro": "Centro",
    "SacadoEnderecoCEP": "87098765",
    "SacadoEnderecoCidade": "Maringá",
    "SacadoEnderecoComplemento": "Fundos",
    "SacadoEnderecoLogradouro": "Rua teste, 987",
    "SacadoEnderecoPais": "Brasil",
    "SacadoEnderecoUF": "PR",
    "SacadoNome": "Teste de Souza",
    "SacadoTelefone": "4499999999",
    "SacadoCelular": "44999999999",
    "TituloDataDesconto": "05/01/2020",
    "TituloValorDesconto": "0,01",
    "TituloDataEmissao": "01/01/2020",
    "TituloDataVencimento": "01/01/2020",
    "TituloValorJuros": "0,01",
    "TituloPrazoProtesto": "30",
    "TituloMensagem01": "Juros de 0,01 ao dia",
    "TituloMensagem02": "Nao receber apos 30 dias de atraso",
    "TituloMensagem03": "Titulo sujeito a protesto apos 30 dias",
    "TituloNossoNumero": contador,
    "TituloNumeroDocumento": "01012020",
    "TituloValor": "0,02",
    "TituloLocalPagamento": "Pagável em qualquer banco até o vencimento."
  }
]
const gerarEmail =
{
    "IdIntegracao": ["rkx50Eo2Wg", "ByeacqED3l", "HJgxLQAWWe"],
    "EmailNomeRemetente": "Empresa Exemplo",
    "EmailRemetente": "exemplo@remetente.com.br",
    "EmailAssunto": "Boleto para pagamento",
    "EmailMensagem": "Segue o link do boleto:<br> ${linkBoleto}<br>Considere não imprimir este email.<br><b>Código HTML dentro da Tag</b>",
    "EmailDestinatario": ["email1@tecnospeed.com.br", "email2@tecnospeed.com.br"],
    "EmailAnexarBoleto": true,
    "EmailConteudoHtml": true
    }

const gerarImpressao =
{
    "TipoImpressao" : 1,
    "Boletos" : [
      "IdIntegracao1",
      "IdIntegracao2"
    ]
  }
const alterValor = 
{
    "Tipo" : "1",
    "Boletos" : [
      {
      "IdIntegracao": "IdIntegracao1",
      "TituloValor": "100,00"
      },
      {
      "IdIntegracao": "IdIntegracao2",
      "TituloValor": "5000,00"
      }
    ]
  }
const alterData = 
{
  "Tipo" : "0",
  "Boletos" : [
    {
    "IdIntegracao": "IdIntegracao1",
    "TituloDataVencimento": "20/06/2018"
    },
    {
    "IdIntegracao": "IdIntegracao2",
    "TituloDataVencimento": "20/06/2018"
    }
  ]
}
//Funções gerar 
document.getElementById("boleto").addEventListener("click",()=>{
   // document.getElementById("entrada").innerHTML=''
    document.getElementById("entrada").innerHTML+=JSON.stringify(incluirBody,null,2)
})
document.getElementById("email").addEventListener("click",()=>{
    document.getElementById("entrada").innerHTML=JSON.stringify(gerarEmail,null,2)
})
document.getElementById("impressao").addEventListener("click",()=>{
    document.getElementById("entrada").innerHTML=JSON.stringify(gerarImpressao,null,2)
})
document.getElementById("upload").addEventListener("click",()=>{
    document.getElementById("entrada").innerHTML=JSON.stringify(retorno,null,2)
})
document.getElementById("alteracaoData").addEventListener("click",()=>{
    document.getElementById("entrada").innerHTML=JSON.stringify(alterData,null,2)
})
document.getElementById("alteracaoValor").addEventListener("click",()=>{
    document.getElementById("entrada").innerHTML=JSON.stringify(alterValor,null,2)
})
