const asyncHandler = require('express-async-handler')
const express = require('express')
const mongoose = require('mongoose')

const CustomError = require('../utils/CustomError')


const router = express.Router()
const Processo = mongoose.model('Processo')

router.get('/', asyncHandler(async (req, res, next) => {
  var processos = await Processo.find()
  res.json(processos)
}))

router.get('/:_id', asyncHandler(async (req, res, next) => {
  var processos = await Processo.find({ ...req.params })
  res.json(processos)
}))

router.post('/', asyncHandler(async (req, res, next) => {
  var processo = new Processo(req.body)
  await processo.save()
  res.json(processo)
}))

router.put('/', asyncHandler(async (req, res, next) => {
  var { _id, ...processo } = req.body
  processo = await Processo.findOneAndUpdate({ _id }, { $set: processo }, { new: true })
  res.json(processo)
}))

module.exports = router
