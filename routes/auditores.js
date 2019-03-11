const router = require('express').Router()

const dbi = require('../dbi')


router.get('/', async (req, res) => {
  var auditores = await dbi.Auditor.find().lean()
  res.json(auditores)
})

module.exports = router
