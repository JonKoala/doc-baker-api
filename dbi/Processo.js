const { model, Schema } = require('mongoose')

const documentoSchema = require('./ProcessoDocumento')
const documentoMTPSchema = require('./ProcessoDocumentoMTP')


processoSchema = new Schema({
  nome: String,
  numero: String,
  ano: Number,
  objeto: {
    codigo: String,
    descricao: String
  },
  representante: {
    nome: String,
    isPessoaFisica: Boolean
  },
  tipo: { type: String, enum: [null, 'Representação', 'Denúncia'] },
  workflow: [{
    action: String,
    state: String
  }],
  documentos: [documentoSchema]
})
processoSchema.path('documentos').discriminator('MTP', documentoMTPSchema)
processoSchema.path('documentos').discriminator('MT', new Schema({}))

module.exports = model('Processo', processoSchema)
