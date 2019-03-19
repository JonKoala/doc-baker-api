const router = require('express').Router()

const CustomError = require('../utils/CustomError')
const dbi = require('../dbi')
const DocumentoMTPSchema = require('../dbi/ProcessoDocumentoMTP')


router.get('/periculum/options', async (req, res) => {
  var options = DocumentoMTPSchema.path('pressupostos.presentePericulum').enumValues.filter(t => t != null)
  res.json(options)
})

router.get('/', async (req, res, next) => {

  if (!Object.keys(req.query).includes('processo'))
    throw new CustomError('Missing obrigatory parameters')

  var processo = await dbi.Processo.findById(req.query.processo).lean()

  if (!processo)
    throw new CustomError('Processo not found')

  res.locals.processo = processo
  next()
})

router.get('/', async (req, res, next) => {

  if (Object.keys(req.query).includes('template')) {
    var documento = res.locals.processo.documentos.find(d => d.template === req.query.template)
    await dbi.Auditor.populate(documento, 'auditores')
    res.json(documento || null)
  } else
    next()
})

router.get('/', async (req, res, next) => {

  if (Object.keys(req.query).includes('documento')) {
    var documento = res.locals.processo.documentos.find(d => d._id === req.query.documento)
    await dbi.Auditor.populate(documento, 'auditores')
    res.json(documento || null)
  } else
    next()
})

router.get('/', async (req, res) => {
  var documentos = await Promise.all(res.locals.processo.documentos.map(d => dbi.Auditor.populate(d, 'auditores')))
  res.json(documentos)
})

router.put('/', async (req, res) => {
  var { processo, documento } = req.body

  processo = await dbi.Processo.findById(processo, 'documentos')
  if (!processo)
    throw new CustomError('Processo not found')

  //update or push the documento
  var existingDoc = processo.documentos.find(d => d.template === documento.template)
  if (existingDoc)
    existingDoc.set(documento)
  else
    processo.documentos.push(documento)
  processo = await processo.save()

  var documento = processo.documentos.find(doc => doc.template === documento.template)
  await dbi.Auditor.populate(documento, 'auditores')
  res.json(documento || null)
})

module.exports = router
