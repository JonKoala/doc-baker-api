const mongoose = require('mongoose')


const Schema = mongoose.Schema

mongoose.model('RequisitoAdmissibilidade', new mongoose.Schema({
  inciso: String,
  descricao: {
    ausente: String,
    generico: String,
    presente: String,
  }
}, { collection: 'requisitosadmissibilidade' }))
