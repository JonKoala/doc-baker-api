const mongoose = require('mongoose')

const mtp = require('./Processo.documento.mtp')


const Schema = mongoose.Schema

mongoose.model('Processo', new Schema({
  nome: String,
  numero: String,
  ano: Number,
  tipo: { type: String, enum: [null, 'Representação', 'Denúncia'] },
  workflow: [{
    action: String,
    state: String
  }],
  documento: {
    mtp
  }
}))
