const asyncHandler = require('express-async-handler')
const express = require('express')
const mongoose = require('mongoose')

const arrayUtils = require('../utils/ArrayUtils')
const bakery = require('../bakery')
const CustomError = require('../utils/CustomError')


const Processo = mongoose.model('Processo')
const router = express.Router()

router.get('/bake', asyncHandler(async (req, res) => {

  if (!arrayUtils.containsAll(Object.keys(req.query), ['template', 'processo']))
    throw new CustomError('Missing obrigatory parameters')

  var doc = await bakery.bake(req.query.template, req.query.processo)
  var processo = await Processo.findOne({ _id: req.query.processo })

  res.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'Content-Disposition': `attachment; filename="processo ${processo.nome.replace(/\//g, '-')}.docx"`
  })
  res.send(doc)
}))

module.exports = router
