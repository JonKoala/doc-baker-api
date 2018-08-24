const mongoose = require('mongoose')


const Schema = mongoose.Schema

mongoose.model('Auditor', new mongoose.Schema({
  nome: String,
	matricula: String
}))
