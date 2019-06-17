const router = require('express').Router()

const dbi = require('../dbi')
const DocumentoMTPSchema = require('../dbi/ProcessoDocumentoMTP')


router.get('/admissibilidade/options', async (req, res) => {
  var requisitosAdmissibilidade = await dbi.RequisitoAdmissibilidade.find().lean()
  res.json(requisitosAdmissibilidade)
})

router.get('/cautelar/periculum/options', async (req, res) => {
  var options = DocumentoMTPSchema.path('cautelar.presentePericulum').enumValues.filter(t => t != null)
  res.json(options)
})

router.get('/:processo', async (req, res) => {

  var processo = await res.locals.processo
    .populate([{ path: 'documentos.auditores', justOne: false }, { path: 'documentos.admissibilidade.requisitosPresentes', justOne: false }])
    .select('documentos')
    .lean()

  res.json(processo.documentos.find(d => d.template === 'MTP'))
})

router.put('/', async (req, res) => {

  var { processo, documento, existingDoc } = res.locals

  if (existingDoc)
    existingDoc.set(documento)
  else
    processo.documentos.push(documento)
  processo = await processo.save()

  documento = processo.documentos.find(doc => doc.template === documento.template)
  await Promise.all([
    dbi.Auditor.populate(documento, 'auditores'),
    dbi.RequisitoAdmissibilidade.populate(documento, 'admissibilidade.requisitosPresentes')
  ])
  res.json(documento)
})

module.exports = router
