const asyncHandler = require('express-async-handler')
const express = require('express')
const mongoose = require('mongoose')


const router = express.Router()
const Auditor = mongoose.model('Auditor')

router.get('/', asyncHandler(async (req, res) => {
  var auditores = await Auditor.find()
  res.json(auditores)
}))

module.exports = router
