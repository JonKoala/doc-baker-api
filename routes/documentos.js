const router = require('express').Router()

const CustomError = require('../utils/CustomError')
const dbi = require('../dbi')
const DocumentoMTPSchema = require('../dbi/ProcessoDocumentoMTP')


router.get('/periculum/options', async (req, res) => {
  var options = DocumentoMTPSchema.path('pressupostos.presentePericulum').enumValues.filter(t => t != null)
  res.json(options)
})

router.get('/', async (req, res) => {

  if (!Object.keys(req.query).includes('processo'))
    throw new CustomError('Missing obrigatory parameters')

  var processo = await dbi.Processo.findById(req.query.processo).lean()
  if (!processo)
    throw new CustomError('Processo not found')

  if (Object.keys(req.query).includes('documento'))
    res.json(processo.documentos.find(documento => documento._id == req.query.documento))
  else if (Object.keys(req.query).includes('template'))
    res.json(processo.documentos.find(documento => documento.template === req.query.template))
  else
    res.json(processo.documentos)
})

router.put('/', async (req, res) => {
  var { processo, documento } = req.body

  processo = await dbi.Processo.findById(processo, 'documentos')
  if (!processo)
    throw new CustomError('Processo not found')

  //update or push the documento
  var existingDoc = processo.documentos.find(doc => doc.template === documento.template)
  if (existingDoc)
    existingDoc.set(documento)
  else
    processo.documentos.push(documento)
  processo = await processo.save()

  res.json(processo.documentos.find(doc => doc.template === documento.template))
})

module.exports = router
