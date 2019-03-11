const { model, Schema } = require('mongoose')


module.exports = model('Auditor', new Schema({
  nome: String,
	matricula: String
}, { collection: 'auditores' }))
