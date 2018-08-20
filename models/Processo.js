const mongoose = require('mongoose')

mongoose.model('Processo', new mongoose.Schema({
  nome: String,
  numero: String,
  ano: Number,
  workflow: [{
    action: String,
    state: String
  }]
}))
