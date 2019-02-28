const Schema = require('mongoose').Schema


module.exports = {

  // Processo
  irregularidades: [{ type: String }],
  objeto: {
    codigo: String,
    descricao: String
  },
  representante: {
    nome: String,
    isPessoaFisica: Boolean
  },

  // MTP
  auditores: [{ type: Schema.Types.ObjectId, ref: 'Auditor' }],
  requisitosPresentes: [{ type: Schema.Types.ObjectId, ref: 'RequisitoAdmissibilidade' }],
  pressupostos: {
    presenteFumus: Boolean,
    presentePericulum: { type: String, enum: ['SIM', 'NÃO', 'REVERSO'] }
  }
}
