const mongoose = require('mongoose')

const mtp = require('./Processo.documento.mtp')


const Schema = mongoose.Schema

mongoose.model('Processo', new Schema({
  nome: String,
  numero: String,
  ano: Number,
  representante: String,
  tipo: { type: String, enum: ['Representação', 'Denúncia'] },
  workflow: [{
    action: String,
    state: String
  }],
  documento: {
    mtp
  },
  contrato: {
    edital: String,
    objeto: String
  },
  irregularidades: [{
      titulo: String
  }]
}))
