const mongoose = require('mongoose')

const mtp = require('./Processo.documento.mtp')


const Schema = mongoose.Schema

mongoose.model('Processo', new Schema({
  nome: String,
  numero: String,
  ano: Number,
  workflow: [{
    action: String,
    state: String
  }],
  documento: {
    mtp
  },
  processo: {
    representante: String,
    tipo: { type: String, enum: [ 'Representação', 'Denúncia' ] }
  },
  contrato: {
    edital: String,
    objeto: String
  },
  irregularidades: [{
      titulo: String
  }]
}))
