const Schema = require('mongoose').Schema


module.exports = {
  auditores: [{ type: Schema.Types.ObjectId, ref: 'Auditor' }],
  requisitos: {
    presentes: [{ type: Schema.Types.ObjectId, ref: 'RequisitoAdmissibilidade' }],
    ausentes: [{ type: Schema.Types.ObjectId, ref: 'RequisitoAdmissibilidade' }]
  },
  pressupostos: {
    presenteFumus: Boolean,
    presentePericulum: { type: String, enum: ['SIM', 'NÃO', 'REVERSO'] }
  }
}
