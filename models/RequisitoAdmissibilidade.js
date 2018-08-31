const mongoose = require('mongoose')


const Schema = mongoose.Schema

mongoose.model('RequisitoAdmissibilidade', new mongoose.Schema({
  inciso: String,
  descricao: {
    presente: String,
    ausente: String
  }
}, { collection: 'requisitosadmissibilidade' }))
