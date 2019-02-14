const mongoose = require('mongoose')
const router = require('express').Router()


const Processo = mongoose.model('Processo')

router.get('/tipo/options', async (req, res) => {
  var tipos = Processo.schema.path('tipo').enumValues.filter(t => t != null)
  res.json(tipos)
})

router.get('/periculum/options', async (req, res) => {
  var options = Processo.schema.path('documento.mtp.pressupostos.presentePericulum').enumValues
  res.json(options)
})

router.get('/abstract', async (req, res) => {
  var processos = await Processo.find(null, 'nome numero ano workflow').lean()
  res.json(processos)
})

router.get('/workflow/:_id', async (req, res) => {
  var workflow = await Processo.findOne({ ...req.params }, 'workflow').lean()
  res.json(workflow)
})

router.get('/:_id', async (req, res) => {
  var processo = await Processo.findOne({ ...req.params }).lean()
  res.json(processo)
})

router.get('/', async (req, res) => {
  var processos = await Processo.find().lean()
  res.json(processos)
})

router.post('/', async (req, res) => {
  var { _id, ...processo } = req.body

  processo = new Processo(processo)
  await processo.save()
  res.json(processo)
})

router.put('/', async (req, res) => {
  var { _id, ...processo } = req.body

  processo = await Processo.findOneAndUpdate({ _id }, { $set: processo }, { new: true }).lean()
  res.json(processo)
})

module.exports = router
