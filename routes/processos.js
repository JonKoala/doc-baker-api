const router = require('express').Router()

const dbi = require('../dbi')


router.get('/objeto/tipo/options', async (req, res) => {
  var tipos = dbi.Processo.schema.path('objeto.tipo').enumValues.filter(t => t != null)
  res.json(tipos)
})

router.get('/tipo/options', async (req, res) => {
  var tipos = dbi.Processo.schema.path('tipo').enumValues.filter(t => t != null)
  res.json(tipos)
})

router.get('/abstract', async (req, res) => {
  var processos = await dbi.Processo.find(null, 'nome numero ano workflow').lean()
  res.json(processos)
})

router.get('/workflow/:_id', async (req, res) => {
  var processo = await dbi.Processo.findOne({ ...req.params }, '-documentos').lean()
  res.json(processo)
})

router.get('/:_id', async (req, res) => {
  var processo = await dbi.Processo.findOne({ ...req.params }).lean()
  res.json(processo)
})

router.get('/', async (req, res) => {
  var processos = await dbi.Processo.find().lean()
  res.json(processos)
})

router.post('/', async (req, res) => {
  var { _id, ...processo } = req.body

  processo = new dbi.Processo(processo)
  processo = await processo.save()
  res.json(processo)
})

router.put('/', async (req, res) => {
  var { _id, ...processo } = req.body

  processo = await dbi.Processo.findOneAndUpdate({ _id }, { $set: processo }, { new: true }).lean()
  res.json(processo)
})

module.exports = router
