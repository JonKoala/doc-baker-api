const { Schema } = require('mongoose')


module.exports = new Schema({
  irregularidades: [{ type: String }],
  pressupostos: {
    presenteFumus: Boolean,
    presentePericulum: { type: String, enum: [null, 'SIM', 'NÃO', 'REVERSO'] }
  },
  requisitosPresentes: [{ type: Schema.Types.ObjectId, ref: 'RequisitoAdmissibilidade' }]
})
