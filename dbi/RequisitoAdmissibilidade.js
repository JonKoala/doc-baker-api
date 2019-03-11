const { model, Schema } = require('mongoose')


module.exports = model('RequisitoAdmissibilidade', new Schema({
  inciso: String,
  descricao: {
    ausente: String,
    generico: String,
    presente: String,
  }
}, { collection: 'requisitosadmissibilidade' }))
