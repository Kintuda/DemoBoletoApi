//global

module.exports.isAuthenticate = (req, res, next) => {
  if (!cnpjSh || !cnpjCedente || !tokenSoftware) {
    return res.render(
      'error', {
        message: 'Erro não autenticado, realize as autenticação para utilizar o sistema'
      }
    )
  }
}
