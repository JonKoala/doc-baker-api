const mongoose = require('mongoose')
const router = require('express').Router()


const Auditor = mongoose.model('Auditor')

router.get('/', async (req, res) => {
  var auditores = await Auditor.find().lean()
  res.json(auditores)
})

module.exports = router
