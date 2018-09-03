const asyncHandler = require('express-async-handler')
const express = require('express')
const mongoose = require('mongoose')


const router = express.Router()
const Processo = mongoose.model('Processo')

router.get('/tipo/options', asyncHandler(async (req, res) => {
  var tipos = Processo.schema.path('tipo').enumValues.filter(t => t != null)
  res.json(tipos)
}))

router.get('/periculum/options', asyncHandler(async (req, res) => {
  var options = Processo.schema.path('documento.mtp.pressupostos.presentePericulum').enumValues
  res.json(options)
}))

router.get('/abstract', asyncHandler(async (req, res) => {
  var processos = await Processo.find(null, 'nome numero ano workflow')
  res.json(processos)
}))

router.get('/workflow/:_id', asyncHandler(async (req, res) => {
  var workflow = await Processo.findOne({ ...req.params }, 'workflow')
  res.json(workflow)
}))

router.get('/:_id', asyncHandler(async (req, res) => {
  var processo = await Processo.findOne({ ...req.params })
  res.json(processo)
}))

router.get('/', asyncHandler(async (req, res) => {
  var processos = await Processo.find()
  res.json(processos)
}))

router.post('/', asyncHandler(async (req, res) => {
  var { _id, ...processo } = req.body

  processo = new Processo(processo)
  await processo.save()
  res.json(processo)
}))

router.put('/', asyncHandler(async (req, res) => {
  var { _id, ...processo } = req.body
  processo = await Processo.findOneAndUpdate({ _id }, { $set: processo }, { new: true })
  res.json(processo)
}))

module.exports = router
