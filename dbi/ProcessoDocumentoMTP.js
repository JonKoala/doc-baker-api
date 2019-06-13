const { Schema } = require('mongoose')


module.exports = new Schema({
  irregularidades: [{ type: String }],
  cautelar: {
    presenteFumus: Boolean,
    presentePericulum: { type: String, enum: [null, 'SIM', 'NÃO', 'REVERSO'] }
  },
  admissibilidade: {
    requisitosPresentes: [{ type: Schema.Types.ObjectId, ref: 'RequisitoAdmissibilidade' }]
  }
})
