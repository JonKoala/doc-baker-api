const Schema = require('mongoose').Schema


module.exports = {
  auditores: [{ type: Schema.Types.ObjectId, ref: 'Auditor' }],
  requisitosPresentes: [{ type: Schema.Types.ObjectId, ref: 'RequisitoAdmissibilidade' }],
  pressupostos: {
    presenteFumus: Boolean,
    presentePericulum: { type: String, enum: ['SIM', 'NÃO', 'REVERSO'] }
  }
}
