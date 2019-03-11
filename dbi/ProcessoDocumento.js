const { Schema } = require('mongoose')


module.exports = new Schema({
  auditores: [{ type: Schema.Types.ObjectId, ref: 'Auditor' }]
}, { discriminatorKey: 'template' })
