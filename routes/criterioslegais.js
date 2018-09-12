const asyncHandler = require('express-async-handler')
const express = require('express')
const mongoose = require('mongoose')


const router = express.Router()
const RequisitoAdmissibilidade = mongoose.model('RequisitoAdmissibilidade')

router.get('/admissibilidade', asyncHandler(async (req, res) => {
  var requisitosAdmissibilidade = await RequisitoAdmissibilidade.find().lean()
  res.json(requisitosAdmissibilidade)
}))

module.exports = router
